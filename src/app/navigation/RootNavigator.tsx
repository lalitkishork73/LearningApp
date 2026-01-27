import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'

import TopicsScreen from '../../features/videoLearning/screens/TopicsScreen'
import VideoPlayerScreen from '../../features/videoLearning/screens/VideoPlayerScreen'
// import GamesListScreen from '../../features/games/screens/GamesListScreen'
// import GamePlayerScreen from '../../features/games/screens/GamePlayerScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Topics"
            screenOptions={{
                headerTitleAlign: 'center',
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="Topics"
                component={TopicsScreen}
                options={{ title: 'Learning Topics' }}
            />

            <Stack.Screen
                name="VideoPlayer"
                component={VideoPlayerScreen}
                options={{ headerShown: false }}
            />

            {/* <Stack.Screen
                name="GamesList"
                component={GamesListScreen}
                options={{ title: 'Offline Games' }}
            />

            <Stack.Screen
                name="GamePlayer"
                component={GamePlayerScreen}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    )
}

export default RootNavigator
