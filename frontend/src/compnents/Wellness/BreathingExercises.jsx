import React, { useState } from 'react';
import './Wellness.css';

const BreathingExercises = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  
  const emotions = [
    { name: 'Stress', duration: '2 min', color: '#6B48FF' },
    { name: 'Anger', duration: '3 min', color: '#FF4848' },
    { name: 'Irritation', duration: '3 min', color: '#FF7848' },
    { name: 'Sadness', duration: '3 min', color: '#4890FF' },
    { name: 'Fear', duration: '3 min', color: '#48FFB0' },
    { name: 'Worry', duration: '4 min', color: '#8048FF' },
    { name: 'Envy', duration: '3 min', color: '#48FF48' }
  ];

  const startExercise = (emotion) => {
    setSelectedEmotion(emotion);
    // TODO: Implement the breathing exercise logic
  };

  return (
    <div className="wellness-container">
      <h1>Techniques to Overcome Stress and Worry</h1>
      <p className="description">What do you want to reduce?</p>

      <div className="emotions-grid">
        {emotions.map((emotion) => (
          <div
            key={emotion.name}
            className="emotion-card"
            style={{ backgroundColor: emotion.color + '10' }}
            onClick={() => startExercise(emotion)}
          >
            <div className="emotion-content">
              <h3>{emotion.name}</h3>
              <p>{emotion.duration}</p>
              <div className="emotion-icon">
                {/* Add appropriate emotion icons/illustrations here */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEmotion && (
        <div className="exercise-modal">
          <div className="exercise-content">
            <h2>Managing {selectedEmotion.name}</h2>
            <div className="breathing-animation">
              {/* Add breathing animation here */}
            </div>
            <div className="instructions">
              <p>Follow the breathing pattern:</p>
              <ol>
                <li>Breathe in for 4 seconds</li>
                <li>Hold for 4 seconds</li>
                <li>Breathe out for 4 seconds</li>
                <li>Hold for 4 seconds</li>
              </ol>
            </div>
            <button onClick={() => setSelectedEmotion(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathingExercises; 