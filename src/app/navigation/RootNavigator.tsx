import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import SplashScreen from '../../features/common/screens/SplashScreen'
import HomeScreen from '../../features/common/screens/HomeScreen'
import VideoTopicsScreen from '../../features/videoLearning/screens/VideoTopicsScreen'
import VideoPlayerScreen from '../../features/videoLearning/screens/VideoPlayerScreen'
import GamesListScreen from '../../features/games/screens/GamesListScreen'
import GamePlayerScreen from '../../features/games/screens/GamePlayerScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Learning App' }} />
            <Stack.Screen name="VideoTopics" component={VideoTopicsScreen} options={{ title: 'Video Learning' }} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GamesList" component={GamesListScreen} options={{ title: 'Offline Games' }} />
            <Stack.Screen name="GamePlayer" component={GamePlayerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default RootNavigator
