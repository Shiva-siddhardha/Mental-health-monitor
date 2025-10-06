import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Loader from 'react-js-loader';
import Navbar from '../navbar/Navbar';
import './Therapist.css';
import { useMentalHealth } from '../../Mentalhealthcontext/MentalHealthContext';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const TypingAnimation = ({ color }) => (
  <div className="item text-2xl">
    <Loader type="ping-cube" bgColor={color} color={color} size={100} />
  </div>
);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const chatBoxRef = useRef(null);
  const genAIRef = useRef(null);
  const { quizResults, updateQuizResults } = useMentalHealth();

  useEffect(() => {
    if (!API_KEY) {
      setApiKeyMissing(true);
      setMessages([{
        sender: 'ai',
        text: "AI therapist is unavailable because the Gemini API key is not configured. Please set REACT_APP_GEMINI_API_KEY in your environment."
      }]);
      return;
    }

    try {
      genAIRef.current = new GoogleGenerativeAI(API_KEY);
    } catch (err) {
      console.error('Failed to initialize Generative AI client:', err);
      setApiKeyMissing(true);
      setMessages([{
        sender: 'ai',
        text: "AI therapist is unavailable due to an initialization error."
      }]);
      return;
    }

    if (quizResults && quizResults.score !== null) {
      setMessages([{
        sender: 'ai',
        text: "Hello! I'm your AI mental health assistant. How can I support you today?"
      }]);
    } else {
      try {
        const savedResults = JSON.parse(localStorage.getItem('quizResults'));
        if (savedResults && savedResults.score !== null) {
          updateQuizResults(savedResults);
          setMessages([{
            sender: 'ai',
            text: "Hello! I'm your AI mental health assistant. How can I support you today?"
          }]);
        } else {
          setMessages([{
            sender: 'ai',
            text: "Hello! I'm your AI mental health assistant. How can I support you today?"
          }]);
        }
      } catch (error) {
        console.error("Error loading quiz results:", error);
        setMessages([{
          sender: 'ai',
          text: "Hello! I'm here to help. How are you feeling today?"
        }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!API_KEY || !genAIRef.current) {
      setMessages(prevMessages => [...prevMessages, {
        sender: 'ai',
        text: 'AI service is not available. Please contact the administrator or configure the API key.'
      }]);
      return;
    }

    const newMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const model = genAIRef.current.getGenerativeModel({ model: "gemini-2.5-pro" });

      let prompt;

      if (quizResults && quizResults.score !== null) {
        prompt = `You are an AI therapist with access to the user's mental health assessment.

        - **Mental health assessment score:** ${quizResults.score}/100  
        - **Analysis summary:** ${quizResults.analysis}  

        Provide **personalized** suggestions based on this assessment. Keep responses **short and practical** (1-2 sentences max).  

        User: ${input}  
        Therapist:`;
      } else {
        prompt = `Keep responses **short (1-2 sentences max)** and provide general emotional support. No clinical diagnosis.

        User: ${input}  
        Therapist:`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let aiMessage = await response.text();

      aiMessage = aiMessage.split('. ').slice(0, 2).join('. ');
      if (!aiMessage.endsWith('.')) aiMessage = aiMessage + '.';

      aiMessage = aiMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: aiMessage }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prevMessages => [...prevMessages, {
        sender: 'ai',
        text: 'I ran into an issue generating a response. Could you try again?'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="therapist-container">
        <h1 className="heading">Your AI Therapist</h1>
        {quizResults && quizResults.score !== null && (
          <div className="assessment-badge">
            <span>Assessment Score: {quizResults.score}/100</span>
          </div>
        )}
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
          {loading && <TypingAnimation color="#007BFF" />}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={apiKeyMissing ? "AI unavailable - API key missing" : "Type your message..."}
            className="input-field"
            disabled={apiKeyMissing}
          />
          <button 
            onClick={handleSend} 
            disabled={loading || apiKeyMissing}
            className={`send-button ${loading || apiKeyMissing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Therapist;