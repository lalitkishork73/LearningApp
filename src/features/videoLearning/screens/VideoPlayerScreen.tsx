import React, { useEffect, useMemo, useRef } from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native'
import Video from 'react-native-video'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { videoController } from '../logic/videoLearningController'
import ActivityModal from '../components/ActivityModal'
import { VIDEO_LIST } from '../data/mockData'
import { COLORS } from '../../../theme/colors'
import { SvgUri } from 'react-native-svg';

const { width } = Dimensions.get('window')
const PLAYER_HEIGHT = width * 0.56
type video = any

const VideoPlayerScreen = () => {
    const isPlaying = useVideoLearningStore(state => state.isPlaying)
    const setDuration = useVideoLearningStore(state => state.setDuration)
    const currentVideoId = useVideoLearningStore(state => state.currentVideoId)
    const setCurrentVideo = useVideoLearningStore(state => state.setCurrentVideo)
    const loadVideoProgress = useVideoLearningStore(state => state.loadVideoProgress)
    const videoProgressMap = useVideoLearningStore(state => state.videoProgressMap)

    const playerRef = useRef<video>(null)
    const currentVideo = useMemo(
        () => VIDEO_LIST.find(v => v.id === currentVideoId)!,
        [currentVideoId]
    )

    const progressData = videoProgressMap[currentVideoId]
    const percent = progressData?.duration
        ? progressData.lastTime / progressData.duration
        : 0

    const handleSeek = (data: any) => {
        videoController.handleSeek(data.currentTime, playerRef.current)
    }

    const handleLoad = (data: any) => {
        setDuration(data.duration)
        const { currentTime, setVideoDuration } = useVideoLearningStore.getState()
        if (currentTime > 0) playerRef.current?.seek(currentTime)
        setVideoDuration(currentVideoId, data.duration)
    }

    useEffect(() => {
        videoController.initAppStateListener()
        videoController.resetForNewVideo()
        loadVideoProgress(currentVideoId)
    }, [currentVideoId])

    const otherVideos = useMemo(
        () => VIDEO_LIST.filter(v => v.id !== currentVideoId),
        [currentVideoId]
    )

    return (
        <View style={styles.container}>
            {/* 🎬 Video Player */}
            <View style={styles.playerWrapper}>
                <Video
                    ref={playerRef}
                    source={{ uri: currentVideo.url }}
                    style={styles.video}
                    paused={!isPlaying}
                    resizeMode="contain"
                    controls
                    onLoad={handleLoad}
                    onProgress={(data) => videoController.handleProgress(data.currentTime)}
                    onSeek={handleSeek}
                />
            </View>

            {/* 📄 Video Info */}
            <View style={styles.infoSection}>
                <Text style={styles.videoTitle}>{currentVideo.title}</Text>
                <Text style={styles.meta}>
                    {Math.ceil((progressData?.duration || 0) / 60)} min •{' '}
                    {Math.ceil(percent * 100)}% watched
                </Text>

                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${percent * 100}%` }]} />
                </View>
            </View>

            <ActivityModal />

            {/* 📚 Up Next */}
            <Text style={styles.upNext}>Up Next</Text>

            <FlatList
                data={otherVideos}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => setCurrentVideo(item.id)}>
                        <SvgUri
                            width="70"
                            height="70"
                            uri={'https://www.svgrepo.com/show/528782/video-library.svg'}
                            // style={styles.thumbnail}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.duration}>{`${item.duration} min`}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default VideoPlayerScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    playerWrapper: {
        borderRadius: 14,
        overflow: 'hidden',
        margin: 12,
        backgroundColor: 'black',
        elevation: 4,
    },

    video: {
        width: '100%',
        height: PLAYER_HEIGHT,
    },

    infoSection: {
        paddingHorizontal: 16,
        marginTop: 4,
    },

    videoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },

    meta: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    progressBarBg: {
        height: 6,
        backgroundColor: COLORS.background,
        borderRadius: 4,
        marginTop: 10,
        overflow: 'hidden',
    },

    progressBarFill: {
        height: 6,
        backgroundColor: COLORS.primary,
    },

    upNext: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
        marginHorizontal: 16,
        color: COLORS.textPrimary,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
    },

    thumb: {
        width: 100,
        height: 70,
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 8,
        marginHorizontal: 10,
        color: COLORS.textPrimary,
    },

    duration: {
        fontSize: 12,
        marginHorizontal: 10,
        marginTop: 4,
        marginBottom: 8,
        color: COLORS.textSecondary,
    },
})
