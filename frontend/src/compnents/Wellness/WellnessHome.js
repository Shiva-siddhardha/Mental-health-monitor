import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeatureCard = ({ title, description, icon, onPress, colors }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <LinearGradient
      colors={colors}
      style={styles.cardGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image source={icon} style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const WellnessHome = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Find peace and calm</Text>
      
      <View style={styles.recommendedSection}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <TouchableOpacity 
          style={styles.recommendedCard}
          onPress={() => navigation.navigate('SleepStoryPlayer', { id: 'featured' })}
        >
          <Image 
            source={require('../assets/featured-sleep.jpg')} 
            style={styles.recommendedImage} 
          />
          <View style={styles.recommendedOverlay}>
            <Text style={styles.recommendedTitle}>Tonight's Pick</Text>
            <Text style={styles.recommendedSubtitle}>Mountain Lake Cabin</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.featuresGrid}>
        <FeatureCard
          title="Sleep Stories"
          description="Calming tales to help you drift off"
          icon={require('../assets/sleep-icon.png')}
          colors={['#7474BF', '#348AC7']}
          onPress={() => navigation.navigate('SleepStories')}
        />
        
        <FeatureCard
          title="Soothing Music"
          description="Peaceful sounds to relax your mind"
          icon={require('../assets/music-icon.png')}
          colors={['#834d9b', '#d04ed6']}
          onPress={() => navigation.navigate('MusicLibrary')}
        />
        
        <FeatureCard
          title="Calming Techniques"
          description="Quick exercises for anxiety relief"
          icon={require('../assets/calm-icon.png')}
          colors={['#56ab2f', '#a8e063']}
          onPress={() => navigation.navigate('CalmingTechniques')}
        />
      </View>
      
      <View style={styles.quickToolsSection}>
        <Text style={styles.sectionTitle}>Quick Tools</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.quickTool}
            onPress={() => navigation.navigate('BreathingExercise')}
          >
            <Text style={styles.quickToolTitle}>Breathing</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickTool}
            onPress={() => navigation.navigate('GuidedMeditation', { id: 'quick' })}
          >
            <Text style={styles.quickToolTitle}>3-Min Meditation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickTool}
            onPress={() => navigation.navigate('MusicPlayer', { id: 'focus' })}
          >
            <Text style={styles.quickToolTitle}>Focus Music</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  recommendedSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  recommendedCard: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  recommendedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  recommendedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  recommendedTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  recommendedSubtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  quickToolsSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  quickTool: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    marginRight: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickToolTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default WellnessHome;