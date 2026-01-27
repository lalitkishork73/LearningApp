

import React, { useState } from 'react'
import { Modal, View, Text, Button, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { videoController } from '../logic/videoLearningController'

const ActivityModal = () => {
    const { showActivityModal, activeCheckpoint } = useVideoLearningStore()
    const [count, setCount] = useState(0)

    const handlePress = () => {
        if (count >= 4) {
            setCount(0)
            videoController.handleActivityCompletion()
        } else {
            setCount((c) => c + 1)
        }
    }

    return (
        <Modal visible={showActivityModal} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Activity — Minute {activeCheckpoint}</Text>
                    <Text>Tap button 5 times to continue</Text>
                    <Button title={`Tap (${count}/5)`} onPress={handlePress} />
                </View>
            </View>
        </Modal>
    )
}

export default ActivityModal


const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'center', backgroundColor: '#00000099' },
    modal: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
})
