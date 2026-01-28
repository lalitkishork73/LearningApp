import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import QuizActivity from './QuizActivity'
import GameActivity from './GameActivity'

const ActivityModal = () => {
    const { showActivityModal, activityType } = useVideoLearningStore()

    if (!showActivityModal || !activityType) return null

    return (
        <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {activityType === 'quiz' ? <QuizActivity /> : <GameActivity />}
                </View>
            </View>
        </Modal>
    )
}

export default ActivityModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
    },
})
