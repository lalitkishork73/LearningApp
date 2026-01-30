import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../../features/common/screens/SplashScreen';
import HomeScreen from '../../features/common/screens/HomeScreen';
import VideoTopicsScreen from '../../features/videoLearning/screens/VideoTopicsScreen';
import VideoPlayerScreen from '../../features/videoLearning/screens/VideoPlayerScreen';
import GamesListScreen from '../../features/games/screens/GamesListScreen';
import GamePlayerScreen from '../../features/games/screens/GamePlayerScreen';
import { COLORS } from '../../theme/colors'
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.background,
        contentStyle: { backgroundColor: COLORS.background, flex: 1 },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Learning App' }}
      />
      <Stack.Screen
        name="VideoTopics"
        component={VideoTopicsScreen}
        options={{ title: 'Video Learning', headerShown: true }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="GamesList"
        component={GamesListScreen}
        options={{ title: 'Offline Games', headerShown: true }}
      />
      <Stack.Screen
        name="GamePlayer"
        component={GamePlayerScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
