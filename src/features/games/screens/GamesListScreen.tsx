import React, { useCallback } from 'react'
import { SvgUri } from 'react-native-svg'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    FlatList,
    useWindowDimensions,
} from 'react-native'
import { GAMES } from '../data/mockData'
import { useGamesStore } from '../store/gamesStore'
import { downloadGame } from '../logic/gameDownloadService'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../theme/colors'
import { Download, Play } from 'lucide-react-native'

const GamesListScreen = () => {
    const navigation = useNavigation<any>()
    const downloadedGames = useGamesStore(state => state.downloadedGames)
    const downloading = useGamesStore(state => state.downloading)

    const { height } = useWindowDimensions()

    const handleGamePress = useCallback(
        async (gameId: string, zipUrl: string, isDownloaded: boolean) => {
            try {
                if (isDownloaded) {
                    navigation.navigate('GamePlayer', { gameId })
                } else {
                    await downloadGame(gameId, zipUrl)
                }
            } catch {
                Alert.alert(
                    'Download Failed',
                    'Please check your internet connection and try again.'
                )
            }
        },
        [navigation]
    )

    const renderItem = ({ item }: any) => {
        const isDownloaded = !!downloadedGames[item.id]
        const isLoading = downloading === item.id

        return (
            <View style={styles.card}>
                {/* Game Icon */}
                <View style={styles.iconWrapper}>
                    <SvgUri
                        width="70"
                        height="70"
                        uri="https://www.svgrepo.com/show/503859/game.svg"
                    />
                </View>

                {/* Info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isDownloaded ? 'Available Offline' : 'Requires Download'}
                    </Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        isDownloaded ? styles.playButton : styles.downloadButton,
                    ]}
                    onPress={() => handleGamePress(item.id, item.zipUrl, isDownloaded)}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : isDownloaded ? (
                        <>
                            <Play size={18} color="#fff" />
                            <Text style={styles.actionText}>Play</Text>
                        </>
                    ) : (
                        <>
                            <Download size={18} color="#fff" />
                            <Text style={styles.actionText}>Get</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={GAMES}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                contentContainerStyle={[
                    styles.contentContainer,
                    { minHeight: height }, // 🔥 Fix scroll issue after rotation
                ]}
            />
        </View>
    )
}

export default GamesListScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    contentContainer: {
        padding: 16,
        paddingBottom: 40,
        flexGrow: 1, // 🔥 Important for rotation scroll fix
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: 12,
        borderRadius: 14,
        marginBottom: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    iconWrapper: {
        width: 70,
        height: 70,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },

    info: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },

    subtitle: {
        fontSize: 12,
        marginTop: 4,
        color: COLORS.textSecondary,
    },

    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },

    downloadButton: {
        backgroundColor: COLORS.primary,
    },

    playButton: {
        backgroundColor: COLORS.success,
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
    },
})
