import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { useGamesStore } from '../../games/store/gamesStore'
import { useVideoLearningStore } from '../store/videoLearningStore'

const GameActivity = () => {
    const { downloadedGames } = useGamesStore()
    const { completeActivity } = useVideoLearningStore()

    const gamePath = Object.values(downloadedGames)[0]
    console.log(gamePath)

    if (!gamePath) {
        return <Text>No game available</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: `file://${gamePath}/index.html` }} />
            <Text style={styles.exit} onPress={completeActivity}>
                Exit Game
            </Text>
        </View>
    )
}

export default GameActivity

const styles = StyleSheet.create({
    exit: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#4A90E2',
        color: 'white',
    },
})
