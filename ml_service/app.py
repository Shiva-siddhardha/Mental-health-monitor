from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, List

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np


class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    score: float
    label: str
    emotions: Dict[str, float]
    highlights: List[Dict[str, float]]
    confidence: float


app = FastAPI()


# CPU-friendly small model; you can change to a larger one on Colab
SENTIMENT_MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
EMOTION_MODEL = "joeddav/distilbert-base-uncased-go-emotions-student"

sentiment_tokenizer = AutoTokenizer.from_pretrained(SENTIMENT_MODEL)
sentiment_model = AutoModelForSequenceClassification.from_pretrained(SENTIMENT_MODEL)
emotion_tokenizer = AutoTokenizer.from_pretrained(EMOTION_MODEL)
emotion_model = AutoModelForSequenceClassification.from_pretrained(EMOTION_MODEL)

sentiment_model.eval()
emotion_model.eval()


def softmax(x: np.ndarray) -> np.ndarray:
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=-1, keepdims=True)


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    text = req.text.strip()
    if not text:
        return AnalyzeResponse(
            score=0.0,
            label="neutral",
            emotions={"neutral": 1.0},
            highlights=[],
            confidence=1.0,
        )

    with torch.no_grad():
        # Sentiment
        s_inputs = sentiment_tokenizer(text, return_tensors="pt", truncation=True)
        s_outputs = sentiment_model(**s_inputs)
        s_logits = s_outputs.logits[0].detach().numpy()
        s_probs = softmax(s_logits)
        s_labels = ["negative", "neutral", "positive"]
        s_idx = int(np.argmax(s_probs))
        s_label = s_labels[s_idx]
        s_conf = float(s_probs[s_idx])
        score = float((s_probs[2] - s_probs[0]) * 10.0)  # -10..+10 scale

        # Emotions (multi-label)
        e_inputs = emotion_tokenizer(text, return_tensors="pt", truncation=True)
        e_outputs = emotion_model(**e_inputs)
        e_logits = e_outputs.logits[0].detach().numpy()
        e_probs = 1 / (1 + np.exp(-e_logits))

        emotion_labels = emotion_model.config.id2label
        emotions = {emotion_labels[i].lower(): float(e_probs[i]) for i in range(len(e_probs))}

        # Simple token importance using gradient-free attention proxy (approx)
        # For explainability on CPU, return top tokens by normalized attention from last layer
        try:
            # Re-run with output_attentions to get attention weights
            s_outputs_attn = sentiment_model(**sentiment_tokenizer(text, return_tensors="pt", truncation=True), output_attentions=True)
            attn = s_outputs_attn.attentions[-1]  # last layer: (batch, heads, seq, seq)
            attn_mean = attn.mean(dim=1)[0]  # (seq, seq)
            token_importance = attn_mean[:, 0]  # attention to CLS token
            tokens = sentiment_tokenizer.convert_ids_to_tokens(s_inputs["input_ids"][0])
            imp = token_importance.detach().numpy()
            imp = (imp - imp.min()) / (imp.max() - imp.min() + 1e-9)
            highlights = []
            for tok, score_tok in zip(tokens, imp):
                if tok in ("[CLS]", "[SEP]", "</s>", "<s>"):
                    continue
                highlights.append({"token": tok, "weight": float(score_tok)})
            # Keep top 10
            highlights = sorted(highlights, key=lambda x: x["weight"], reverse=True)[:10]
        except Exception:
            highlights = []

    return AnalyzeResponse(
        score=round(score, 2),
        label=s_label,
        emotions=emotions,
        highlights=highlights,
        confidence=round(s_conf, 3),
    )


