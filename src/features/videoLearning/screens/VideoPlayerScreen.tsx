import React, { useEffect, useRef } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Video from 'react-native-video'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { videoController } from '../logic/videoLearningController'
import ActivityModal from '../components/ActivityModal'
import { VIDEO_LIST } from '../data/mockData'

const { width } = Dimensions.get('window')
const PLAYER_HEIGHT = width * 0.56
type video = any

const VideoPlayerScreen = () => {
    const isPlaying = useVideoLearningStore(state => state.isPlaying)
    const setDuration = useVideoLearningStore(state => state.setDuration)
    const currentVideoId = useVideoLearningStore(state => state.currentVideoId)
    const setCurrentVideo = useVideoLearningStore(state => state.setCurrentVideo)

    const playerRef = useRef<video>(null)
    const currentVideo = VIDEO_LIST.find(v => v.id === currentVideoId)!


    console.log('render')

    const handleSeek = (data: any) => {
        videoController.handleSeek(data.currentTime, playerRef.current)
    }

    useEffect(() => {
        videoController.initAppStateListener()
        videoController.resetForNewVideo()
    }, [currentVideoId])

    return (
        <View style={styles.container}>
            {/* Video Player */}
            <Video
                ref={playerRef}
                source={{ uri: currentVideo.url }}
                style={styles.video}
                paused={!isPlaying}
                resizeMode="contain"
                controls
                onLoad={(data) => setDuration(data.duration)}
                onProgress={(data) => videoController.handleProgress(data.currentTime)}
                onSeek={(data) => handleSeek(data)}
            />

            <ActivityModal />

            {/* Other Videos */}
            <FlatList
                data={VIDEO_LIST.filter(v => v.id !== currentVideoId)}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => setCurrentVideo(item.id)}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.duration}>{item.duration}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default VideoPlayerScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    video: { width: '100%', height: PLAYER_HEIGHT, backgroundColor: 'black' },
    list: { padding: 15 },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: '600' },
    duration: { marginTop: 5, color: '#777' },
})
