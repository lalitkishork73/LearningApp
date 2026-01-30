import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { VIDEO_LIST } from '../data/mockData'
import { COLORS } from '../../../theme/colors'

const VideoProgressInfo = () => {
    const currentVideoId = useVideoLearningStore(s => s.currentVideoId)
    const videoProgressMap = useVideoLearningStore(s => s.videoProgressMap)

    const progressData = videoProgressMap[currentVideoId]
    const percent = progressData?.duration
        ? progressData.lastTime / progressData.duration
        : 0

    const currentVideo = useMemo(
        () => VIDEO_LIST.find(v => v.id === currentVideoId)!,
        [currentVideoId]
    )

    return (
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
    )
}

export default React.memo(VideoProgressInfo)

const styles = StyleSheet.create({
    infoSection: { paddingHorizontal: 16, marginTop: 4 },
    videoTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
    meta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
    progressBarBg: {
        height: 6,
        backgroundColor: COLORS.background,
        borderRadius: 4,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressBarFill: { height: 6, backgroundColor: COLORS.primary },
})
