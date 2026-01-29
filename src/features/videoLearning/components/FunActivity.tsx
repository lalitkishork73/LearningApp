import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { COLORS } from '../../../theme/colors'

const emojis = ['🍎', '🚗', '🐶', '⚽', '🌟', '🎵']

const shuffle = (arr: string[]) =>
    [...arr, ...arr].sort(() => Math.random() - 0.5)

const FunActivity = () => {
    const { completeActivity } = useVideoLearningStore()

    const [cards, setCards] = useState<string[]>(shuffle(emojis))
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])

    useEffect(() => {
        if (matched.length === cards.length && cards.length > 0) {
            setTimeout(() => completeActivity(), 800)
        }
    }, [matched])

    const handlePress = (index: number) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return

        const newFlipped = [...flipped, index]
        setFlipped(newFlipped)

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped
            if (cards[first] === cards[second]) {
                setMatched(prev => [...prev, first, second])
            }
            setTimeout(() => setFlipped([]), 700)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧠 Memory Match</Text>
            <Text style={styles.subtitle}>Find all matching pairs</Text>

            <View style={styles.grid}>
                {cards.map((emoji, index) => {
                    const isOpen = flipped.includes(index) || matched.includes(index)

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, matched.includes(index) && styles.matched]}
                            onPress={() => handlePress(index)}
                        >
                            <Text style={styles.cardText}>{isOpen ? emoji : '❓'}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default FunActivity

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
    grid: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    matched: {
        backgroundColor: COLORS.success,
    },
    cardText: { fontSize: 28 },
})
