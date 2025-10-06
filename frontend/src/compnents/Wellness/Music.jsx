import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './Wellness.css';

const musicCategories = [
    {
        id: 1,
        name: 'Meditation Music',
        description: 'Calming melodies designed to help you focus and relax during meditation.',
        benefits: 'Reduces stress, improves concentration, enhances mindfulness practice',
        difficulty: 'Easy',
        duration: '10-30 minutes',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Peaceful Mind', duration: '10:00' },
            { id: 2, title: 'Deep Breathing', duration: '15:00' },
            { id: 3, title: 'Zen Garden', duration: '20:00' },
            { id: 4, title: 'Morning Meditation', duration: '10:00' },
            { id: 5, title: 'Evening Calm', duration: '15:00' }
        ]
    },
    {
        id: 2,
        name: 'Nature Sounds',
        description: 'Immersive recordings of natural environments to bring the outdoors inside.',
        benefits: 'Reduces anxiety, improves sleep, creates a calming environment',
        difficulty: 'Easy',
        duration: '30-60 minutes',
        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Ocean Waves', duration: '30:00' },
            { id: 2, title: 'Forest Stream', duration: '45:00' },
            { id: 3, title: 'Rainfall', duration: '60:00' },
            { id: 4, title: 'Birdsong', duration: '30:00' },
            { id: 5, title: 'Mountain Wind', duration: '45:00' }
        ]
    },
    {
        id: 3,
        name: 'Sleep Music',
        description: 'Soothing compositions designed to help you fall asleep and stay asleep.',
        benefits: 'Improves sleep quality, reduces insomnia, promotes relaxation',
        difficulty: 'Easy',
        duration: '60-120 minutes',
        image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Deep Sleep', duration: '60:00' },
            { id: 2, title: 'Lullaby', duration: '45:00' },
            { id: 3, title: 'Night Sounds', duration: '90:00' },
            { id: 4, title: 'Sleepy Piano', duration: '60:00' },
            { id: 5, title: 'Dreamscape', duration: '120:00' }
        ]
    },
    {
        id: 4,
        name: 'Focus Music',
        description: 'Instrumental tracks to enhance concentration and productivity.',
        benefits: 'Improves focus, enhances productivity, reduces distractions',
        difficulty: 'Easy',
        duration: '30-60 minutes',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Study Session', duration: '45:00' },
            { id: 2, title: 'Work Focus', duration: '60:00' },
            { id: 3, title: 'Creative Flow', duration: '30:00' },
            { id: 4, title: 'Reading Music', duration: '45:00' },
            { id: 5, title: 'Productivity Boost', duration: '60:00' }
        ]
    },
    {
        id: 5,
        name: 'Stress Relief',
        description: 'Calming melodies specifically designed to reduce stress and anxiety.',
        benefits: 'Lowers cortisol levels, reduces anxiety, promotes relaxation',
        difficulty: 'Easy',
        duration: '15-30 minutes',
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Anxiety Relief', duration: '15:00' },
            { id: 2, title: 'Stress Buster', duration: '20:00' },
            { id: 3, title: 'Calm Mind', duration: '30:00' },
            { id: 4, title: 'Relaxation', duration: '15:00' },
            { id: 5, title: 'Peaceful Thoughts', duration: '20:00' }
        ]
    },
    {
        id: 6,
        name: 'Mood Booster',
        description: 'Upbeat and positive music to elevate your mood and energy.',
        benefits: 'Improves mood, increases energy, promotes positivity',
        difficulty: 'Easy',
        duration: '20-40 minutes',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tracks: [
            { id: 1, title: 'Happy Vibes', duration: '20:00' },
            { id: 2, title: 'Energy Boost', duration: '30:00' },
            { id: 3, title: 'Positive Thoughts', duration: '25:00' },
            { id: 4, title: 'Mood Lifter', duration: '20:00' },
            { id: 5, title: 'Joyful Moments', duration: '40:00' }
        ]
    }
];

const Music = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const audioRef = useRef(null);
    
    // Sample audio URLs - replace these with your actual audio files
    const audioUrls = {
        'Peaceful Mind': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3',
        'Deep Breathing': 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1ecd.mp3',
        'Zen Garden': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3',
        'Morning Meditation': 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1ecd.mp3',
        'Evening Calm': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3',
        'Ocean Waves': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Forest Stream': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Rainfall': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Birdsong': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Mountain Wind': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Deep Sleep': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Lullaby': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Night Sounds': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Sleepy Piano': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Dreamscape': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Study Session': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Work Focus': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Creative Flow': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Reading Music': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Productivity Boost': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Anxiety Relief': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Stress Buster': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Calm Mind': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Relaxation': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Peaceful Thoughts': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Happy Vibes': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Energy Boost': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Positive Thoughts': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Mood Lifter': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3',
        'Joyful Moments': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b74cb928.mp3'
    };

    const filteredCategories = musicCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTrackSelect = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        
        // Set the audio source and play
        if (audioRef.current) {
            audioRef.current.src = audioUrls[track.title] || 'https://assets.mixkit.co/music/preview/mixkit-relaxing-meditation-music-547.mp3';
            audioRef.current.volume = volume;
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleClosePlayer = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setCurrentTrack(null);
        setIsPlaying(false);
    };

    // Clean up audio when component unmounts
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <audio ref={audioRef} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8 mt-20"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Music & Sound Therapy</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Explore our collection of therapeutic music and sounds designed to help you relax, focus, and improve your mental well-being.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search music categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 pl-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <svg
                            className="absolute left-4 top-4 h-6 w-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                    <p className="text-gray-300 text-sm">{category.duration}</p>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <p className="text-gray-300 mb-4">{category.description}</p>
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Benefits:</h4>
                                    <p className="text-gray-400 text-sm">{category.benefits}</p>
                                </div>
                                
                                <div className="space-y-2">
                                    {category.tracks.map((track, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleTrackSelect(track)}
                                            className="w-full p-3 text-left rounded-lg bg-gray-700 hover:bg-purple-900 transition-colors duration-200 border border-gray-600"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-200">{track.title}</span>
                                                <span className="text-gray-400 text-sm">{track.duration}</span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {currentTrack && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 shadow-lg"
                    >
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-semibold text-white">{currentTrack.title}</h3>
                                    <p className="text-gray-400 text-sm">{currentTrack.duration}</p>
                                </div>
                                <button
                                    onClick={handleClosePlayer}
                                    className="text-gray-400 hover:text-white"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={togglePlayPause}
                                    className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                                >
                                    {isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </button>
                                <div className="flex-1 flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-7.072m-2.828 9.9a9 9 0 010-12.728" />
                                    </svg>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.01" 
                                        value={volume} 
                                        onChange={handleVolumeChange}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-7.072m-2.828 9.9a9 9 0 010-12.728" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Music; 