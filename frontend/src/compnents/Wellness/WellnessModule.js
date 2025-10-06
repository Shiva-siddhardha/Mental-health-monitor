import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WellnessHome from './screens/WellnessHome';
import SleepStories from './screens/SleepStories';
import SleepStoryPlayer from './screens/SleepStoryPlayer';
import MusicLibrary from './screens/MusicLibrary';
import MusicPlayer from './screens/MusicPlayer';
import CalmingTechniques from './screens/CalmingTechniques';
import BreathingExercise from './screens/BreathingExercise';
import GuidedMeditation from './screens/GuidedMeditation';

const Stack = createStackNavigator();

const WellnessModule = () => {
  return (
    <Stack.Navigator
      initialRouteName="WellnessHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8f8f8',
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}
    >
      <Stack.Screen name="Wellness" component={WellnessHome} />
      <Stack.Screen name="SleepStories" component={SleepStories} />
      <Stack.Screen name="SleepStoryPlayer" component={SleepStoryPlayer} />
      <Stack.Screen name="MusicLibrary" component={MusicLibrary} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      <Stack.Screen name="CalmingTechniques" component={CalmingTechniques} />
      <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
      <Stack.Screen name="GuidedMeditation" component={GuidedMeditation} />
    </Stack.Navigator>
  );
};

export default WellnessModule;