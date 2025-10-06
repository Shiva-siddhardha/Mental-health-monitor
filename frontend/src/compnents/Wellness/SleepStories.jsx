import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wellness.css';

const SleepStories = () => {
  const [stories, setStories] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [storiesResponse, soundsResponse] = await Promise.all([
          axios.get('/api/sleep-stories'),
          axios.get('/api/sleep-sounds')
        ]);
        setStories(storiesResponse.data);
        setSounds(soundsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="wellness-container dark-theme">
      <h1>Sleep Better at Night</h1>
      
      <section className="sleep-course">
        <h2>Course</h2>
        <div className="course-card">
          <h3>Learn to deep sleep</h3>
          <p>Meditation for a deep sleep and peaceful rest</p>
          <div className="course-illustration">
            {/* Add meditation illustration */}
          </div>
        </div>
      </section>

      <section className="sleep-stories">
        <h2>Sleep Stories</h2>
        <div className="stories-grid">
          {loading ? (
            <div className="loading">Loading stories...</div>
          ) : (
            stories.map((story) => (
              <div key={story._id} className="story-card">
                <img src={story.thumbnail} alt={story.title} />
                <div className="story-content">
                  <h3>{story.title}</h3>
                  <span className="duration">{story.duration}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="sounds-for-sleep">
        <h2>Sounds for Sleep</h2>
        <div className="sounds-list">
          {loading ? (
            <div className="loading">Loading sounds...</div>
          ) : (
            sounds.map((sound) => (
              <div key={sound._id} className="sound-item">
                <div className="sound-info">
                  <h3>{sound.title}</h3>
                  <p>{sound.description}</p>
                </div>
                <div className="sound-controls">
                  <audio controls>
                    <source src={sound.audioUrl} type="audio/mpeg" />
                  </audio>
                  <div className="volume-slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      onChange={(e) => {
                        const audio = e.target.previousSibling;
                        audio.volume = e.target.value / 100;
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

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

export default SleepStories; 