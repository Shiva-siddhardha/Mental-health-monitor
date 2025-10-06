// Enhanced emotion word lists for more accurate sentiment analysis
const emotionLexicon = {
  joy: [
    'happy', 'excited', 'delighted', 'wonderful', 'great', 'blessed', 'grateful', 'fantastic',
    'peaceful', 'love', 'enjoyed', 'smile', 'laugh', 'pleasure', 'satisfied', 'achievement',
    'joyful', 'cheerful', 'content', 'blissful', 'ecstatic', 'elated', 'jubilant', 'thrilled',
    'optimistic', 'proud', 'confident', 'inspired', 'motivated', 'energetic', 'enthusiastic',
    'accomplished', 'successful', 'fulfilled', 'relaxed', 'calm', 'serene', 'tranquil'
  ],
  sadness: [
    'sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'heartbroken', 'disappointed',
    'hopeless', 'grief', 'crying', 'hurt', 'pain', 'lost', 'empty', 'regret', 'gloomy',
    'devastated', 'despair', 'melancholy', 'sorrow', 'worthless', 'rejected', 'helpless',
    'abandoned', 'defeated', 'discouraged', 'broken', 'numb', 'suffering', 'tearful',
    'depressing', 'meaningless', 'alone', 'isolated', 'unwanted', 'unloved', 'down'
  ],
  anger: [
    'angry', 'furious', 'mad', 'irritated', 'frustrated', 'annoyed', 'rage', 'hate',
    'bitter', 'hostile', 'aggressive', 'resent', 'outraged', 'terrible', 'livid',
    'enraged', 'infuriated', 'agitated', 'disgusted', 'offended', 'upset', 'betrayed',
    'vengeful', 'violent', 'hateful', 'angry', 'provoked', 'resentful', 'jealous'
  ],
  anxiety: [
    'anxious', 'worried', 'nervous', 'stressed', 'tense', 'afraid', 'scared', 'panic',
    'uneasy', 'restless', 'fearful', 'overwhelmed', 'concerned', 'dread', 'apprehensive',
    'terrified', 'paranoid', 'insecure', 'uncertain', 'doubtful', 'pressured', 'troubled',
    'distressed', 'disturbed', 'uncomfortable', 'hesitant', 'panicky', 'alarmed', 'phobic',
    'traumatized', 'confused', 'unsettled', 'unsure', 'vulnerable'
  ],
  neutral: [
    'okay', 'fine', 'normal', 'average', 'moderate', 'balanced', 'steady', 'stable',
    'regular', 'usual', 'routine', 'common', 'typical', 'alright', 'fair', 'decent',
    'reasonable', 'standard', 'ordinary', 'neutral', 'indifferent', 'unchanged'
  ]
};

// Enhanced intensity modifiers with more nuanced scoring
const intensityModifiers = {
  very: 1.5,
  really: 1.5,
  extremely: 2,
  incredibly: 2,
  absolutely: 2,
  totally: 1.8,
  completely: 1.8,
  somewhat: 0.5,
  slightly: 0.3,
  little: 0.3,
  bit: 0.3,
  kind: 0.4,
  sort: 0.4,
  not: -1,
  never: -1,
  no: -1,
  dont: -1,
  "don't": -1,
  barely: 0.2,
  hardly: 0.2,
  almost: 0.8
};

// Negation words that invert the meaning
const negationWords = ['not', 'no', 'never', 'none', 'neither', 'nowhere', 'nothing', "don't", 'cant', "can't", 'wont', "won't"];

// Function to calculate the base mood score with improved accuracy
const calculateMoodScore = (text) => {
  // Convert text to lowercase and split into words
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let emotionCounts = {
    joy: 0,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    neutral: 0
  };

  // Process each word with context window
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const prevWord = i > 0 ? words[i - 1] : null;
    const prevPrevWord = i > 1 ? words[i - 2] : null;
    let modifier = 1;
    let isNegated = false;

    // Check for negation in previous two words
    if (prevWord && negationWords.includes(prevWord)) {
      isNegated = true;
    }
    if (prevPrevWord && negationWords.includes(prevPrevWord) && !intensityModifiers[prevWord]) {
      isNegated = true;
    }

    // Check for intensity modifiers
    if (prevWord && intensityModifiers[prevWord]) {
      modifier = intensityModifiers[prevWord];
      // If negated, reverse the modifier
      if (isNegated) {
        modifier = -modifier;
      }
    }

    // Check each emotion category
    for (const [emotion, wordList] of Object.entries(emotionLexicon)) {
      if (wordList.includes(word)) {
        const emotionValue = isNegated ? -1 : 1;
        emotionCounts[emotion] += 1 * Math.abs(modifier);
        
        // Adjust score based on emotion with weighted values
        switch (emotion) {
          case 'joy':
            score += 1 * modifier * emotionValue;
            break;
          case 'sadness':
            score -= 1.2 * modifier * emotionValue; // Increased weight for sadness
            break;
          case 'anger':
            score -= 1.1 * modifier * emotionValue; // Increased weight for anger
            break;
          case 'anxiety':
            score -= 0.9 * modifier * emotionValue; // Adjusted weight for anxiety
            break;
          case 'neutral':
            // Neutral words slightly pull the score towards 0
            score += (score > 0 ? -0.1 : 0.1) * modifier;
            break;
        }
      }
    }
  }

  // Consider the length of the text in scoring
  const wordCount = words.length;
  const intensityFactor = Math.min(1 + Math.log10(wordCount) * 0.2, 1.5);
  score = score * intensityFactor;

  return {
    score: normalizeScore(score),
    emotions: emotionCounts,
    dominantEmotion: getDominantEmotion(emotionCounts),
    intensity: intensityFactor
  };
};

// Normalize score to be between -10 and 10 with improved curve
const normalizeScore = (score) => {
  const maxScore = 10;
  // Use sigmoid function for smoother normalization
  const normalized = maxScore * (2 / (1 + Math.exp(-score * 0.5)) - 1);
  return Math.round(normalized * 10) / 10;
};

// Get the dominant emotion with improved weighting
const getDominantEmotion = (emotionCounts) => {
  // Apply weights to emotions
  const weights = {
    joy: 1,
    sadness: 1.2,
    anger: 1.1,
    anxiety: 1,
    neutral: 0.5
  };

  return Object.entries(emotionCounts)
    .map(([emotion, count]) => ({
      emotion,
      weightedCount: count * weights[emotion]
    }))
    .reduce((a, b) => a.weightedCount > b.weightedCount ? a : b)
    .emotion;
};

// Main function to analyze journal entry with enhanced analysis
export const analyzeJournalEntry = async (text) => {
  try {
    const response = await fetch('/api/ml/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    // fall back to local analyzer if backend ML not available
  }

  const analysis = calculateMoodScore(text);
  
  let moodDescription;
  const score = analysis.score;
  
  if (score >= 8) {
    moodDescription = "Exceptionally Positive";
  } else if (score >= 6) {
    moodDescription = "Very Positive";
  } else if (score >= 3) {
    moodDescription = "Moderately Positive";
  } else if (score >= 1) {
    moodDescription = "Slightly Positive";
  } else if (score > -1) {
    moodDescription = "Neutral";
  } else if (score > -3) {
    moodDescription = "Slightly Negative";
  } else if (score > -6) {
    moodDescription = "Moderately Negative";
  } else if (score > -8) {
    moodDescription = "Very Negative";
  } else {
    moodDescription = "Exceptionally Negative";
  }

  return {
    score: analysis.score,
    moodDescription,
    dominantEmotion: analysis.dominantEmotion,
    emotions: analysis.emotions,
    intensity: analysis.intensity
  };
};

// Example usage:
// const result = analyzeJournalEntry("I'm feeling very happy today and enjoyed my time with friends");
// console.log(result);
// Output: { 
//   score: 7.5, 
//   moodDescription: "Extremely Positive",
//   dominantEmotion: "joy",
//   emotions: { joy: 2, sadness: 0, anger: 0, anxiety: 0, neutral: 0 }
// } 