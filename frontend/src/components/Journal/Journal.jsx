import React, { useState, useEffect } from 'react';
import { analyzeJournalEntry } from '../../utils/sentimentAnalyzer';
import './Journal.css';

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [journalHistory, setJournalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load journal history from localStorage
    const savedHistory = localStorage.getItem('journalHistory');
    if (savedHistory) {
      setJournalHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!journalEntry.trim()) return;

    // Analyze the journal entry
    const moodAnalysis = analyzeJournalEntry(journalEntry);
    setAnalysis(moodAnalysis);

    // Save to history
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      text: journalEntry,
      analysis: moodAnalysis
    };

    const updatedHistory = [newEntry, ...journalHistory];
    setJournalHistory(updatedHistory);
    localStorage.setItem('journalHistory', JSON.stringify(updatedHistory));

    // Clear the input
    setJournalEntry('');
  };

  const getMoodColor = (score) => {
    if (score >= 7) return '#4CAF50';
    if (score >= 4) return '#8BC34A';
    if (score >= 1) return '#CDDC39';
    if (score > -1) return '#FFC107';
    if (score > -4) return '#FF9800';
    if (score > -7) return '#FF5722';
    return '#F44336';
  };

  const getEmotionEmoji = (emotion) => {
    switch (emotion) {
      case 'joy': return '😊';
      case 'sadness': return '😢';
      case 'anger': return '😠';
      case 'anxiety': return '😰';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-content">
        <h1>Mood Journal</h1>
        <p className="journal-subtitle">Express your thoughts and feelings...</p>

        <form onSubmit={handleSubmit} className="journal-form">
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling today? Write your thoughts here..."
            rows="6"
            className="journal-textarea"
          />
          <button type="submit" className="journal-submit">
            Analyze Mood
          </button>
        </form>

        {analysis && (
          <div className="mood-analysis">
            <h2>Mood Analysis</h2>
            <div className="mood-score" style={{ backgroundColor: getMoodColor(analysis.score) }}>
              <span className="score-number">{analysis.score}</span>
              <span className="score-label">{analysis.moodDescription}</span>
            </div>
            <div className="emotion-summary">
              <p>
                Dominant Emotion: {getEmotionEmoji(analysis.dominantEmotion)} {analysis.dominantEmotion}
              </p>
              <div className="emotion-bars">
                {Object.entries(analysis.emotions).map(([emotion, count]) => (
                  <div key={emotion} className="emotion-bar-container">
                    <div className="emotion-label">
                      {getEmotionEmoji(emotion)} {emotion}
                    </div>
                    <div className="emotion-bar-wrapper">
                      <div 
                        className="emotion-bar"
                        style={{ 
                          width: `${(count / Math.max(...Object.values(analysis.emotions))) * 100}%`,
                          backgroundColor: getMoodColor(emotion === 'joy' ? 8 : emotion === 'neutral' ? 0 : -5)
                        }}
                      />
                      <span className="emotion-count">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="journal-history">
          <button 
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          {showHistory && (
            <div className="history-entries">
              {journalHistory.map((entry) => (
                <div key={entry.id} className="history-entry">
                  <div className="entry-header">
                    <span className="entry-date">{entry.date}</span>
                    <span 
                      className="entry-mood"
                      style={{ backgroundColor: getMoodColor(entry.analysis.score) }}
                    >
                      {entry.analysis.moodDescription} ({entry.analysis.score})
                    </span>
                  </div>
                  <p className="entry-text">{entry.text}</p>
                  <div className="entry-emotion">
                    {getEmotionEmoji(entry.analysis.dominantEmotion)} {entry.analysis.dominantEmotion}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal; 