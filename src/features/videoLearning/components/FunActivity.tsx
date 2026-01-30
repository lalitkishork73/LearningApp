import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import { COLORS } from '../../../theme/colors'
import { useWindowDimensions } from 'react-native'


const emojis = ['🍎', '🚗', '🐶', '⚽', '🌟', '🎵']

const shuffle = (arr: string[]) =>
    [...arr, ...arr].sort(() => Math.random() - 0.5)

const FunActivity = () => {
    const { completeActivity } = useVideoLearningStore()

    const { width, height } = useWindowDimensions()
    const isLandscape = width > height

    const [cards, setCards] = useState<string[]>(shuffle(emojis))
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])


    const numColumns = isLandscape ? 4 : 3
    const spacing = 12
    const totalSpacing = spacing * (numColumns - 1)
    const cardSize = (width * 0.9 - totalSpacing) / numColumns

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
            <Text style={[styles.title, { fontSize: isLandscape ? 18 : 22 }]}>🧠 Memory Match</Text>
            <Text style={[styles.subtitle, { fontSize: isLandscape ? 12 : 16 }]}>Find all matching pairs</Text>

            <View style={[styles.grid, { width: width * 0.9 }]}>
                {cards.map((emoji, index) => {
                    const isOpen = flipped.includes(index) || matched.includes(index)

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.card,
                                {
                                    width: cardSize,
                                    height: cardSize,
                                    marginBottom: spacing,
                                },
                                matched.includes(index) && styles.matched,
                            ]}
                            onPress={() => handlePress(index)}
                        >
                            <Text style={[styles.cardText, { fontSize: cardSize * 0.35 }]}>
                                {isOpen ? emoji : '❓'}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

        </View>
    )
}

export default FunActivity

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center',padding:20 },
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
