import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
} from 'react-native'
import Video from 'react-native-video'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { videoController } from '../logic/videoLearningController'
import { VIDEO_LIST } from '../data/mockData'

const { width } = Dimensions.get('window')
const PLAYER_HEIGHT = width * 0.56

type VideoRef = React.ElementRef<typeof Video> | null

const VideoPlayer = () => {
    const isPlaying = useVideoLearningStore(s => s.isPlaying)
    const currentVideoId = useVideoLearningStore(s => s.currentVideoId)
    const setDuration = useVideoLearningStore(s => s.setDuration)
    const loadVideoProgress = useVideoLearningStore(s => s.loadVideoProgress)

    const [isBuffering, setIsBuffering] = useState(false)
    const bufferTimeout = useRef<any>(null)

    const playerRef = useRef<VideoRef>(null)

    const currentVideo = useMemo(
        () => VIDEO_LIST.find(v => v.id === currentVideoId)!,
        [currentVideoId]
    )

    const handleSeek = (data: any) => {
        videoController.handleSeek(data.currentTime, playerRef.current)
    }

    const handleLoad = (data: any) => {
        setDuration(data.duration)
        const { currentTime, setVideoDuration } = useVideoLearningStore.getState()

        if (currentTime > 0) playerRef.current?.seek(currentTime)

        setVideoDuration(currentVideoId, data.duration)
    }

    const handleBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
        if (isBuffering) {
            bufferTimeout.current = setTimeout(() => setIsBuffering(true), 300)
        } else {
            if (bufferTimeout.current) clearTimeout(bufferTimeout.current)
            setIsBuffering(false)
        }
    }

    useEffect(() => {
        videoController.initAppStateListener()
        videoController.resetForNewVideo()
        loadVideoProgress(currentVideoId)
    }, [currentVideoId])

    return (
        <View style={styles.playerWrapper}>
            <Video
                ref={playerRef}
                source={{ uri: currentVideo.url }}
                style={styles.video}
                resizeMode="contain"
                controls
                paused={!isPlaying}
                maxBitRate={0}
                automaticallyWaitsToMinimizeStalling
                progressUpdateInterval={1000}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000,
                }}
                onBuffer={handleBuffer}
                onLoad={handleLoad}
                onProgress={data => videoController.handleProgress(data.currentTime)}
                onSeek={handleSeek}
            />

            {isBuffering && (
                <View style={styles.bufferOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.bufferText}>Loading...</Text>
                </View>
            )}
        </View>
    )
}

export default React.memo(VideoPlayer)

const styles = StyleSheet.create({
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
    bufferOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    bufferText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
    },
})
