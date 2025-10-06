import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// Replace with your actual data fetching function
const getStoryById = async (id) => {
  // In a real app, fetch from API or database
  return {
    id,
    title: 'Mountain Lake Cabin',
    narrator: 'Sarah Johnson',
    duration: '22:15',
    image: require('../assets/mountain-lake.jpg'),
    audioUri: 'https://example.com/stories/mountain-lake.mp3',
    text: 'The cabin sits nestled among tall pine trees, overlooking a crystal-clear mountain lake. As you approach along the winding path, the fresh scent of pine fills your senses...',
  };
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const SleepStoryPlayer = ({ route, navigation }) => {
  const { id } = route.params;
  const [story, setStory] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [timerValue, setTimerValue] = useState(30); // Default 30 minutes
  const [timerActive, setTimerActive] = useState(false);
  
  useEffect(() => {
    const loadStory = async () => {
      const storyData = await getStoryById(id);
      setStory(storyData);
      loadAudio(storyData.audioUri);
    };
    
    loadStory();
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [id]);
  
  const loadAudio = async (uri) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      
      // Get initial status
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis / 1000);
      }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };
  
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setIsPlaying(status.isPlaying);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };
  
  const togglePlayback = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };
  
  const handleSliderChange = async (value) => {
    if (!sound) return;
    
    await sound.setPositionAsync(value * 1000);
  };
  
  const activateTimer = () => {
    setTimerActive(true);
    setTimeout(() => {
      if (sound) {
        sound.stopAsync();
        setIsPlaying(false);
      }
      setTimerActive(false);
    }, timerValue * 60 * 1000);
  };

  if (!story) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading story...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Image source={story.image} style={styles.backgroundImage} />
      
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.narrator}>Narrated by {story.narrator}</Text>
          
          <View style={styles.playerContainer}>
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Slider
                style={styles.progressSlider}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255,255,255,0.5)"
                thumbTintColor="#fff"
                onSlidingComplete={handleSliderChange}
              />
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            
            <View style={styles.controlsContainer}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="play-skip-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={32} 
                  color="#fff" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="play-skip-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Sleep Timer: {timerValue} min</Text>
            <Slider
              style={styles.timerSlider}
              minimumValue={5}
              maximumValue={60}
              step={5}
              value={timerValue}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              thumbTintColor="#fff"
              onValueChange={setTimerValue}
            />
            <TouchableOpacity 
              style={[styles.timerButton, timerActive && styles.timerActiveButton]}
              onPress={activateTimer}
              disabled={timerActive}
            >
              <Text style={styles.timerButtonText}>
                {timerActive ? "Timer Set" : "Set Timer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  narrator: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
  },
  playerContainer: {
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    width: 40,
  },
  progressSlider: {
    flex: 1,
    height: 40,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  timerSlider: {
    width: '80%',
    height: 40,
  },
  timerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginTop: 8,
  },
  timerActiveButton: {
    backgroundColor: 'rgba(100,200,100,0.3)',
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SleepStoryPlayer;

