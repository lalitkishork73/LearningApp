import React from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { handleVideoProgress } from '../logic/videoLearningController'
import ActivityModal from '../components/ActivityModal'

const VideoPlayerScreen = () => {
    const { isPlaying, setDuration } = useVideoLearningStore()

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                style={styles.video}
                paused={!isPlaying}
                resizeMode="contain"
                onLoad={(data) => setDuration(data.duration)}
                onProgress={(data) => handleVideoProgress(data.currentTime)}
                controls={true}
                
            />

            <ActivityModal />
        </View>
    )
}

export default VideoPlayerScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    video: { flex: 1 },
})
