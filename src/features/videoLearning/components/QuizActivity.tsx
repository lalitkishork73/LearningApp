import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'

const QUESTION = {
    question: 'What is 5 + 3?',
    options: ['6', '7', '8', '9'],
    answer: '8',
}

const QuizActivity = () => {
    const { completeActivity } = useVideoLearningStore()
    const [selected, setSelected] = useState<string | null>(null)

    const handleSubmit = () => {
        if (selected === QUESTION.answer) {
            completeActivity()
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick Quiz</Text>
            <Text style={styles.question}>{QUESTION.question}</Text>

            {QUESTION.options.map(opt => (
                <TouchableOpacity
                    key={opt}
                    style={[styles.option, selected === opt && styles.selected]}
                    onPress={() => setSelected(opt)}
                >
                    <Text>{opt}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizActivity

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    question: { marginBottom: 15 },
    option: { padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
    selected: { backgroundColor: '#D0E8FF' },
    button: {
        marginTop: 10,
        backgroundColor: '#4A90E2',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
})
