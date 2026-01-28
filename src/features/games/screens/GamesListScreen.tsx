import React, { useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    FlatList,
} from 'react-native'
import { GAMES } from '../data/mockData'
import { useGamesStore } from '../store/gamesStore'
import { downloadGame } from '../logic/gameDownloadService'
import { useNavigation } from '@react-navigation/native'

const GamesListScreen = () => {
    const navigation = useNavigation<any>()
    const downloadedGames = useGamesStore(state => state.downloadedGames)
    console.log(downloadedGames)
    const downloading = useGamesStore(state => state.downloading)

    const handleGamePress = useCallback(
        async (gameId: string, zipUrl: string, isDownloaded: boolean) => {
            try {
                if (isDownloaded) {
                    navigation.navigate('GamePlayer', { gameId })
                } else {
                    await downloadGame(gameId, zipUrl)
                }
            } catch {
                Alert.alert('Download Failed', 'Please check your internet connection and try again.')
            }
        },
        [navigation]
    )

    const renderItem = ({ item }: any) => {
        const isDownloaded = !!downloadedGames[item.id]
        const isLoading = downloading === item.id

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => handleGamePress(item.id, item.zipUrl, isDownloaded)}
                disabled={isLoading}
            >
                <Text style={styles.title}>{item.title}</Text>

                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.status}>
                        {isDownloaded ? 'Play Offline' : 'Download'}
                    </Text>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={GAMES}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
        />
    )
}

export default GamesListScreen

const styles = StyleSheet.create({
    container: { padding: 20 },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: '600' },
    status: { marginTop: 6, color: '#4A90E2' },
})
