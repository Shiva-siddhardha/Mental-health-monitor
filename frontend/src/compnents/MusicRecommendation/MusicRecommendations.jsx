import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MusicRecommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const score = location.state?.score || 0;

  const getMoodBasedRecommendations = () => {
    if (score <= 25) {
      return {
        mood: "Positive and Uplifting",
        genres: ["Upbeat Pop", "Happy Folk", "Positive Indie"],
        songs: [
          "Happy by Pharrell Williams",
          "Good Vibrations by The Beach Boys",
          "Walking on Sunshine by Katrina & The Waves",
          "Three Little Birds by Bob Marley",
          "Can't Stop the Feeling by Justin Timberlake"
        ]
      };
    } else if (score <= 50) {
      return {
        mood: "Calming and Soothing",
        genres: ["Acoustic", "Ambient", "Light Classical"],
        songs: [
          "Weightless by Marconi Union",
          "Claire de Lune by Claude Debussy",
          "Someone Like You by Adele",
          "Fix You by Coldplay",
          "Breathe Me by Sia"
        ]
      };
    } else if (score <= 75) {
      return {
        mood: "Reflective and Comforting",
        genres: ["Indie Folk", "Soft Rock", "Jazz"],
        songs: [
          "Skinny Love by Bon Iver",
          "The Sound of Silence by Simon & Garfunkel",
          "Mad World by Gary Jules",
          "Everybody Hurts by R.E.M.",
          "Summertime by Ella Fitzgerald"
        ]
      };
    } else {
      return {
        mood: "Cathartic and Understanding",
        genres: ["Alternative", "Emotional Rock", "Soul"],
        songs: [
          "Hurt by Johnny Cash",
          "Nothing Compares 2 U by Sinead O'Connor",
          "Say Something by A Great Big World",
          "Hallelujah by Jeff Buckley",
          "Breathe Me by Sia"
        ]
      };
    }
  };

  const recommendations = getMoodBasedRecommendations();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">Music Recommendations</h1>
      
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Your Mental Health Score: {score}/100</h2>
        <p className="text-lg">Based on your assessment, we recommend music that is:</p>
        <p className="text-xl font-medium text-indigo-600 mt-2">{recommendations.mood}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 text-indigo-700">Recommended Genres</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.genres.map((genre, index) => (
              <li key={index} className="text-gray-700">{genre}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 text-indigo-700">Recommended Songs</h3>
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.songs.map((song, index) => (
              <li key={index} className="text-gray-700">{song}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate(`/${username}/quiz`)}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Back to Assessment
        </button>
      </div>
    </div>
  );
};

export default MusicRecommendations;