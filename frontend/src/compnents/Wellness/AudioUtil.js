// audioUtils.js - Audio utilities for wellness app
import { Audio } from 'expo-av';

// Configure audio mode for background playback
const configureAudio = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
};

// Pre-load sound effects for instant playback
const loadedSounds = {};

const preloadSound = async (key, uri) => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false }
    );
    loadedSounds[key] = sound;
    return sound;
  } catch (error) {
    console.error('Error preloading sound:', error);
    return null;
  }
};

// Play a preloaded sound effect
const playSound = async (key) => {
  if (loadedSounds[key]) {
    try {
      await loadedSounds[key].replayAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
};

// Handle main audio playback with status updates
let currentSound = null;

const playAudio = async (uri, initialStatus = {}, onPlaybackStatusUpdate = null) => {
  try {
    // Stop any currently playing audio
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    
    // Load and play new audio
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true, ...initialStatus },
      onPlaybackStatusUpdate
    );
    
    currentSound = sound;
    return sound;
  } catch (error) {
    console.error('Error playing audio:', error);
    return null;
  }
};

// Pause current audio
const pauseAudio = async () => {
  if (currentSound) {
    try {
      await currentSound.pauseAsync();
      return true;
    } catch (error) {
      console.error('Error pausing audio:', error);
      return false;
    }
  }
  return false;
};

// Resume current audio
const resumeAudio = async () => {
  if (currentSound) {
    try {
      await currentSound.playAsync();
      return true;
    } catch (error) {
      console.error('Error resuming audio:', error);
      return false;
    }
  }
  return false;
};

// Stop current audio
const stopAudio = async () => {
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      return true;
    } catch (error) {
      console.error('Error stopping audio:', error);
      return false;
    }
  }
  return false;
};

// Get current playback status
const getPlaybackStatus = async () => {
  if (currentSound) {
    try {
      return await currentSound.getStatusAsync();
    } catch (error) {
      console.error('Error getting playback status:', error);
      return null;
    }
  }
  return null;
};

// Set audio position (seek)
const seekAudio = async (positionMillis) => {
  if (currentSound) {
    try {
      await currentSound.setPositionAsync(positionMillis);
      return true;
    } catch (error) {
      console.error('Error seeking audio:', error);
      return false;
    }
  }
  return false;
};

// Set audio volume
const setVolume = async (volume) => {
  if (currentSound) {
    try {
      await currentSound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      return true;
    } catch (error) {
      console.error('Error setting volume:', error);
      return false;
    }
  }
  return false;
};

// Clean up audio resources
const cleanup = async () => {
  if (currentSound) {
    await currentSound.unloadAsync();
    currentSound = null;
  }
  
  // Clean up preloaded sound effects
  Object.values(loadedSounds).forEach(async (sound) => {
    if (sound) {
      await sound.unloadAsync();
    }
  });
};

export default {
  configureAudio,
  preloadSound,
  playSound,
  playAudio,
  pauseAudio,
  resumeAudio,
  stopAudio,
  getPlaybackStatus,
  seekAudio,
  setVolume,
  cleanup,
};

// api/wellnessContent.js - API functions to fetch wellness content
const API_BASE_URL = 'https://your-api-endpoint.com/api';

// Fetch sleep stories
export const fetchSleepStories = async (category = null) => {
  try {
    const url = category ? 
      `${API_BASE_URL}/sleep-stories?category=${category}` : 
      `${API_BASE_URL}/sleep-stories`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sleep stories:', error);
    return [];
  }
};

// Fetch a specific sleep story by ID
export const fetchSleepStoryById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sleep-stories/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching sleep story ${id}:`, error);
    return null;
  }
};

// Fetch music tracks
export const fetchMusicTracks = async (category = null) => {
  try {
    const url = category ? 
      `${API_BASE_URL}/music?category=${category}` : 
      `${API_BASE_URL}/music`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    return [];
  }
};

// Fetch a specific music track by ID
export const fetchMusicTrackById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching music track ${id}:`, error);
    return null;
  }
};

// Fetch calming exercises
export const fetchCalmingExercises = async (type = null) => {
  try {
    const url = type ? 
      `${API_BASE_URL}/calming-exercises?type=${type}` : 
      `${API_BASE_URL}/calming-exercises`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching calming exercises:', error);
    return [];
  }
};

// Fetch a specific calming exercise by ID
export const fetchCalmingExerciseById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calming-exercises/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching calming exercise ${id}:`, error);
    return null;
  }
};

// Search across all content types
export const searchContent = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching content:', error);
    return { sleepStories: [], musicTracks: [], calmingExercises: [] };
  }
};

// For offline use, fallback data
export const FALLBACK_SLEEP_STORIES = [
  {
    id: '1',
    title: 'Mountain Lake Cabin',
    narrator: 'Sarah Johnson',
    duration: '22 min',
    category: 'Nature',
    preview: 'A peaceful retreat in the mountains helps you unwind and prepare for deep sleep...',
    audioUri: require('../assets/audio/mountain-lake.mp3'), // Local fallback
  },
  {
    id: '2',
    title: 'Ocean Waves Meditation',
    narrator: 'Michael Chen',
    duration: '18 min',
    category: 'Nature',
    preview: 'Let the rhythmic sounds of ocean waves carry you into a deep and restful sleep...',
    audioUri: require('../assets/audio/ocean-waves.mp3'),
  },
  {
    id: '3',
    title: 'The Old Bookshop',
    narrator: 'Emily Wilson',
    duration: '25 min',
    category: 'Fiction',
    preview: 'Explore a magical bookshop filled with stories that will transport you to dreamland...',
    audioUri: require('../assets/audio/bookshop.mp3'),
  }
];

export const FALLBACK_MUSIC_TRACKS = [
  {
    id: '1',
    title: 'Gentle Rain',
    artist: 'Nature Sounds',
    duration: '45 min',
    category: 'Nature',
    audioUri: require('../assets/audio/gentle-rain.mp3'), // Local fallback
  },
  {
    id: '2',
    title: 'Deep Forest Ambience',
    artist: 'Nature Sounds',
    duration: '60 min',
    category: 'Nature',
    audioUri: require('../assets/audio/forest-ambience.mp3'),
  },
  {
    id: '3',
    title: 'Starlight Piano',
    artist: 'Peaceful Melodies',
    duration: '32 min',
    category: 'Instrumental',
    audioUri: require('../assets/audio/starlight-piano.mp3'),
  }
];

export const FALLBACK_CALMING_EXERCISES = [
  {
    id: '1',
    title: '4-7-8 Breathing Technique',
    instructor: 'Dr. Anna Lee',
    duration: '10 min',
    type: 'Breathing',
    description: 'A simple breathing exercise to help calm your nervous system and prepare for sleep.',
    audioUri: require('../assets/audio/478-breathing.mp3'),
    steps: [
      'Find a comfortable position, sitting or lying down',
      'Place the tip of your tongue against the ridge behind your upper front teeth',
      'Exhale completely through your mouth, making a whoosh sound',
      'Close your mouth and inhale through your nose for a count of 4',
      'Hold your breath for a count of 7',
      'Exhale completely through your mouth for a count of 8',
      'Repeat this cycle 3-4 times'
    ]
  },
  {
    id: '2',
    title: 'Progressive Muscle Relaxation',
    instructor: 'James Roberts',
    duration: '15 min',
    type: 'Relaxation',
    description: 'Systematically tense and release each muscle group to promote full-body relaxation.',
    audioUri: require('../assets/audio/muscle-relaxation.mp3'),
    steps: [
      'Lie down in a comfortable position',
      'Start with your feet, tensing the muscles for 5 seconds',
      'Release and notice the feeling of relaxation',
      'Move upward through each muscle group: calves, thighs, abdomen, etc.',
      'End with facial muscles, tensing and releasing each area'
    ]
  },
  {
    id: '3',
    title: 'Mindful Body Scan',
    instructor: 'Maya Patel',
    duration: '12 min',
    type: 'Mindfulness',
    description: 'Bring awareness to each part of your body to release tension and promote relaxation.',
    audioUri: require('../assets/audio/body-scan.mp3'),
    steps: [
      'Lie down in a comfortable position',
      'Begin bringing awareness to your feet',
      'Slowly move your attention upward through your body',
      'Notice any sensations without judgment',
      'Allow each body part to soften and release tension'
    ]
  }
];

// Utility for getting local content when offline
export const getOfflineContent = (contentType, id = null) => {
  let collection;
  
  switch (contentType) {
    case 'sleepStories':
      collection = FALLBACK_SLEEP_STORIES;
      break;
    case 'musicTracks':
      collection = FALLBACK_MUSIC_TRACKS;
      break;
    case 'calmingExercises':
      collection = FALLBACK_CALMING_EXERCISES;
      break;
    default:
      return id ? null : [];
  }
  
  if (id) {
    return collection.find(item => item.id === id) || null;
  }
  
  return collection;
};

// Check if device is online
export const isOnline = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`, { 
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.log('Network check failed, device appears to be offline');
    return false;
  }
};