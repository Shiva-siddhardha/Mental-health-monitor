import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wellness.css';

const RelaxingSounds = () => {
  const [sounds, setSounds] = useState([
    { id: 1, name: 'Forest', rating: 5, tags: ['PEACE', 'CALM', 'RELAXATION'] },
    { id: 2, name: 'Wind Chimes', rating: 4 },
    { id: 3, name: 'River Stream', rating: 5 },
  ]);
  
  const [selectedSound, setSelectedSound] = useState(null);
  const [volumes, setVolumes] = useState({
    'BEACH WAVES AND BIRDS': 50,
    'FIRE': 50
  });

  const handleVolumeChange = (soundType, value) => {
    setVolumes(prev => ({
      ...prev,
      [soundType]: value
    }));
  };

  return (
    <div className="wellness-container dark-theme">
      <h1>Relaxing Soothing Sounds</h1>

      <div className="sounds-container">
        {selectedSound ? (
          <div className="sound-detail">
            <div className="sound-header">
              <button className="close-btn" onClick={() => setSelectedSound(null)}>×</button>
              <div className="sound-image">
                {/* Add appropriate background image based on sound type */}
              </div>
              <h2>{selectedSound.name}</h2>
              <div className="rating">
                {'★'.repeat(selectedSound.rating)}
              </div>
              <p>Peaceful sounds to refresh and reawaken your senses.</p>
              <div className="tags">
                {selectedSound.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="sound-controls">
              {Object.entries(volumes).map(([type, volume]) => (
                <div key={type} className="volume-control">
                  <label>{type}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(type, parseInt(e.target.value))}
                  />
                  <span className="volume-icon">🔊</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sounds-grid">
            {sounds.map((sound) => (
              <div
                key={sound.id}
                className="sound-card"
                onClick={() => setSelectedSound(sound)}
              >
                <div className="sound-card-content">
                  <h3>{sound.name}</h3>
                  {sound.rating && (
                    <div className="rating">
                      {'★'.repeat(sound.rating)}
                    </div>
                  )}
                  <button className="play-btn">▶</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <button>Today</button>
        <button>Breath</button>
        <button>Meditate</button>
        <button>Sleep</button>
        <button>Music</button>
      </nav>
    </div>
  );
};

export default RelaxingSounds; 