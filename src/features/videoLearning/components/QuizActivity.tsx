import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { COLORS } from '../../../theme/colors'
import { CheckCircle2, XCircle } from 'lucide-react-native'

type Question = {
    id: string
    question: string
    options: string[]
    answerIndex: number
}

const QUESTIONS: Question[] = [
    {
        id: 'q1',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        answerIndex: 2,
    },
    {
        id: 'q2',
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answerIndex: 1,
    },
    {
        id: 'q3',
        question: 'Water freezes at what temperature (°C)?',
        options: ['0', '10', '32', '100'],
        answerIndex: 0,
    },
]

const QuizActivity = () => {
    const { completeActivity } = useVideoLearningStore()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)

    const currentQuestion = QUESTIONS[currentIndex]
    const progressPercent = ((currentIndex + 1) / QUESTIONS.length) * 100

    const handleOptionPress = (index: number) => {
        if (selectedIndex !== null) return
        setSelectedIndex(index)

        if (index === currentQuestion.answerIndex) {
            setScore(prev => prev + 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedIndex(null)
        } else {
            setShowResult(true)
        }
    }

    const handleFinish = () => {
        completeActivity()
    }

    if (showResult) {
        return (
            <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Quiz Completed 🎉</Text>
                <Text style={styles.scoreText}>
                    You scored {score} / {QUESTIONS.length}
                </Text>

                <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
                    <Text style={styles.primaryButtonText}>Continue Learning</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>

            <Text style={styles.progressText}>
                Question {currentIndex + 1} of {QUESTIONS.length}
            </Text>

            <View style={styles.card}>
                <Text style={styles.question}>{currentQuestion.question}</Text>

                {currentQuestion.options.map((opt, index) => {
                    const isSelected = selectedIndex === index
                    const isCorrect = index === currentQuestion.answerIndex
                    const isWrong = selectedIndex === index && !isCorrect

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.option,
                                isSelected && styles.selectedOption,
                                isCorrect && selectedIndex !== null && styles.correctOption,
                                isWrong && styles.wrongOption,
                            ]}
                            onPress={() => handleOptionPress(index)}
                        >
                            <Text style={styles.optionText}>{opt}</Text>

                            {selectedIndex !== null && isCorrect && (
                                <CheckCircle2 size={18} color="#fff" />
                            )}
                            {isWrong && <XCircle size={18} color="#fff" />}
                        </TouchableOpacity>
                    )
                })}
            </View>

            {selectedIndex !== null && (
                <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                    <Text style={styles.primaryButtonText}>
                        {currentIndex === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default QuizActivity


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.background,
    },

    progressBarBg: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },

    progressBarFill: {
        height: 6,
        backgroundColor: COLORS.primary,
    },

    progressText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 10,
    },

    card: {
        backgroundColor: COLORS.background,
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    question: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 15,
        color: COLORS.textPrimary,
    },

    option: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: '#EEF2FF',
    },

    correctOption: {
        backgroundColor: COLORS.success,
        borderColor: COLORS.success,
    },

    wrongOption: {
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
    },

    optionText: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },

    primaryButton: {
        marginTop: 18,
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },

    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.background,
    },

    resultTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
    },

    scoreText: {
        fontSize: 18,
        marginBottom: 20,
        color: COLORS.textPrimary,
    },
})
