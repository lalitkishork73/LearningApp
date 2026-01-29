import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { COLORS } from '../../../theme/colors'

const ActivityTimeline = () => {
    const { duration, currentTime } = useVideoLearningStore()

    if (!duration) return null

    const activityCount = Math.floor(duration / 60)

    return (
        <View style={styles.container}>
            {/* Played Progress */}
            <View style={[styles.progress, { width: `${(currentTime / duration) * 100}%` }]} />

            {/* Activity Markers */}
            {Array.from({ length: activityCount }).map((_, i) => {
                const leftPercent = ((i + 1) * 60) / duration * 100
                return <View key={i} style={[styles.marker, { left: `${leftPercent}%` }]} />
            })}
        </View>
    )
}

export default ActivityTimeline

const styles = StyleSheet.create({
    container: {
        height: 6,
        backgroundColor: COLORS.border,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    progress: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    marker: {
        position: 'absolute',
        
        width: 3,
        height: '100%',
        backgroundColor: COLORS.primary,
    },
})
