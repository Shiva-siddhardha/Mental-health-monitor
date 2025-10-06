import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const MentalHealthContext = createContext();

// Create a provider component
export const MentalHealthProvider = ({ children }) => {
  // Try to load initial state from localStorage
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const savedResults = localStorage.getItem('quizResults');
      return savedResults ? JSON.parse(savedResults) : {
        score: null,
        analysis: null,
        answers: [],
        questions: []
      };
    } catch (error) {
      console.error("Error loading quiz results from localStorage:", error);
      return {
        score: null,
        analysis: null,
        answers: [],
        questions: []
      };
    }
  });

  const updateQuizResults = (results) => {
    setQuizResults(results);
    
    // Also save to localStorage for persistence
    try {
      localStorage.setItem('quizResults', JSON.stringify(results));
    } catch (error) {
      console.error("Error saving quiz results to localStorage:", error);
    }
  };

  return (
    <MentalHealthContext.Provider value={{ quizResults, updateQuizResults }}>
      {children}
    </MentalHealthContext.Provider>
  );
};

// Custom hook to use the context
export const useMentalHealth = () => {
  return useContext(MentalHealthContext);
};