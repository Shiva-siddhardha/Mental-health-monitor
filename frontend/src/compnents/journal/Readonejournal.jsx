import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, getImageUrl } from '../../utils/api';
import defaultCoverImage from './download.jpg'; // Make sure this path is correct relative to your file structure
import Navbar from '../navbar/Navbar';

const JournalDetail = () => {
    const { id, username } = useParams();
    const [journal, setJournal] = useState(null);
    const [error, setError] = useState(null);
    const [mood, setMood] = useState({ type: '', score: 0, emoji: '' });

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await axios.get(getApiUrl(`/${username}/${id}`));
                setJournal(response.data);
                
                // Analyze mood once journal data is loaded
                if (response.data && response.data.article) {
                    analyzeMood(response.data.article);
                }
            } catch (error) {
                setError('Error fetching journal details');
            }
        };
        
        fetchJournal();
    }, [username, id]);

    // Function to analyze the mood based on text content
    const analyzeMood = (text) => {
        // Lists of mood-related keywords
        const moodKeywords = {
            happy: ['happy', 'joy', 'excited', 'wonderful', 'great', 'amazing', 'love', 'laugh', 'smile', 'pleasure', 'delighted', 'thrilled'],
            sad: ['sad', 'depressed', 'unhappy', 'miserable', 'disappointed', 'upset', 'hurt', 'heartbroken', 'crying', 'tears', 'lonely', 'grief'],
            angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate', 'bitter', 'resent', 'outraged'],
            anxious: ['anxious', 'worried', 'nervous', 'stress', 'fear', 'panic', 'tense', 'uneasy', 'concerned', 'dread', 'scared', 'apprehensive'],
            calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'comfortable', 'composed', 'relieved', 'at ease'],
            motivated: ['motivated', 'inspired', 'determined', 'focused', 'productive', 'energetic', 'enthusiastic', 'accomplished', 'proud', 'confident']
        };

        // Emoji mapping
        const moodEmojis = {
            happy: '😊',
            sad: '😔',
            angry: '😠',
            anxious: '😰',
            calm: '😌',
            motivated: '💪',
            neutral: '😐'
        };

        // Convert text to lowercase for easier matching
        const lowerText = text.toLowerCase();
        
        // Count occurrences of each mood keyword
        const moodCounts = {};
        let totalMoodWords = 0;
        
        Object.keys(moodKeywords).forEach(moodType => {
            moodCounts[moodType] = 0;
            
            moodKeywords[moodType].forEach(keyword => {
                // Count how many times each keyword appears
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                const matches = lowerText.match(regex);
                if (matches) {
                    moodCounts[moodType] += matches.length;
                    totalMoodWords += matches.length;
                }
            });
        });
        
        // Determine the dominant mood
        let dominantMood = 'neutral';
        let highestCount = 0;
        
        Object.keys(moodCounts).forEach(moodType => {
            if (moodCounts[moodType] > highestCount) {
                highestCount = moodCounts[moodType];
                dominantMood = moodType;
            }
        });
        
        // Calculate mood intensity (scale of 1-5)
        let moodScore = 0;
        if (totalMoodWords > 0) {
            // Base intensity on both the number of mood words and their percentage of total text
            const textLength = text.split(/\s+/).length; // Rough word count
            const moodDensity = totalMoodWords / textLength;
            
            // Calculate score based on density and raw count
            moodScore = Math.min(5, Math.ceil(moodDensity * 100) + Math.min(3, highestCount / 2));
        }
        
        // Set the mood state
        setMood({
            type: dominantMood,
            score: moodScore,
            emoji: moodEmojis[dominantMood]
        });
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="bg-white py-16 px-6 text-center text-red-500">{error}</div>
            </>
        );
    }

    if (!journal) {
        return (
            <>
                <Navbar />
                <div className="bg-white py-16 px-6 text-center">Loading...</div>
            </>
        );
    }

    const coverImage = journal.coverPicture ? getImageUrl(journal.coverPicture) : defaultCoverImage;

    // Function to get color based on mood
    const getMoodColor = () => {
        const colors = {
            happy: 'bg-yellow-100 text-yellow-800',
            sad: 'bg-blue-100 text-blue-800',
            angry: 'bg-red-100 text-red-800',
            anxious: 'bg-purple-100 text-purple-800',
            calm: 'bg-green-100 text-green-800',
            motivated: 'bg-orange-100 text-orange-800',
            neutral: 'bg-gray-100 text-gray-800'
        };
        return colors[mood.type] || colors.neutral;
    };

    // Function to get a mood description
    const getMoodDescription = () => {
        const descriptions = {
            happy: 'Your writing reflects joy and positivity!',
            sad: 'Your entry shows signs of sadness or disappointment.',
            angry: 'There seems to be frustration or anger in your writing.',
            anxious: 'Your journal suggests some worry or anxiety.',
            calm: 'Your writing has a peaceful, relaxed tone.',
            motivated: 'Your entry shows determination and enthusiasm!',
            neutral: 'Your writing tone appears balanced and neutral.'
        };
        return descriptions[mood.type] || descriptions.neutral;
    };

    return (
        <>
            <Navbar />
            <div className="bg-white py-16 sm:py-24 mt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 text-center mb-8">
                        <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">{journal.title}</h2>
                        <p className="mt-4 text-gray-500">
                            {new Date(journal.createdAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    
                    {/* Mood indicator */}
                    {mood.type && (
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className={`rounded-lg p-4 ${getMoodColor()} shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium">Mood Analysis</h3>
                                        <p>{getMoodDescription()}</p>
                                    </div>
                                    <div className="text-4xl">{mood.emoji}</div>
                                </div>
                                {mood.score > 0 && (
                                    <div className="mt-2">
                                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                                            <div 
                                                className={`h-2.5 rounded-full ${
                                                    mood.type === 'happy' ? 'bg-yellow-500' : 
                                                    mood.type === 'sad' ? 'bg-blue-500' : 
                                                    mood.type === 'angry' ? 'bg-red-500' : 
                                                    mood.type === 'anxious' ? 'bg-purple-500' : 
                                                    mood.type === 'calm' ? 'bg-green-500' : 
                                                    mood.type === 'motivated' ? 'bg-orange-500' : 
                                                    'bg-gray-500'
                                                }`} 
                                                style={{ width: `${(mood.score/5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs mt-1 text-right">{['Very mild', 'Mild', 'Moderate', 'Strong', 'Very strong'][Math.min(4, Math.max(0, mood.score - 1))]}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-10 flex justify-center">
                        <img src={coverImage} alt="Cover" className="h-96 w-full object-cover rounded-lg shadow-md" />
                    </div>
                    
                    <div className="mt-10 max-w-2xl mx-auto text-left">
                        <p className="text-lg leading-8 text-gray-800 whitespace-pre-line">{journal.article}</p>
                        
                        <div className="mt-8 flex flex-wrap gap-2">
                            {journal.tags && journal.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-lg font-medium text-blue-800">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JournalDetail;