import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wellness.css';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All', 'Meditation', 'Anxiety', 'Depression', 'Mindfulness']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/podcasts');
        setPodcasts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = selectedCategory === 'All' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === selectedCategory);

  return (
    <div className="wellness-container">
      <h1>Mental Health Podcasts</h1>
      <p className="description">Listen to expert discussions and insights on mental health topics.</p>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading podcasts...</div>
      ) : (
        <div className="podcasts-grid">
          {filteredPodcasts.map((podcast) => (
            <div key={podcast._id} className="podcast-card">
              <img src={podcast.thumbnail} alt={podcast.title} className="podcast-thumbnail" />
              <div className="podcast-content">
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                <div className="audio-player">
                  <audio controls>
                    <source src={podcast.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="podcast-meta">
                  <span>Duration: {podcast.duration}</span>
                  <span>Host: {podcast.host}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Podcasts; 