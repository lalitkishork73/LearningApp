import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'VideoTopics'>

const videos = [
    { id: '1', title: 'Introduction to Science', duration: '3 min' },
    { id: '2', title: 'Basics of Mathematics', duration: '2 min' },
    { id: '3', title: 'History Overview', duration: '4 min' },
]

const VideoTopicsScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select a Topic</Text>
            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('VideoPlayer', { topicId: item.id })}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.duration}>{item.duration}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default VideoTopicsScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: '600' },
    duration: { marginTop: 5, color: '#777' },
})
