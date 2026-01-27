import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose Learning Mode</Text>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VideoTopics')}>
                <Text style={styles.cardTitle}>📺 Video Learning</Text>
                <Text style={styles.cardSubtitle}>Watch lessons with in-video activities</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('GamesList')}>
                <Text style={styles.cardTitle}>🎮 Offline Games</Text>
                <Text style={styles.cardSubtitle}>Download and play without internet</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },
    cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
    cardSubtitle: { color: '#555' },
})
