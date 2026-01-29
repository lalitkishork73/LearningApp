import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'
import { COLORS } from '../../../theme/colors'
import { Video, Gamepad2, ChevronRight } from 'lucide-react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerWrap}>
                <Text style={styles.header}>Learning Hub</Text>
                <Text style={styles.subHeader}>
                    Choose how you want to learn today
                </Text>
            </View>

            {/* Video Learning Card */}
            <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.card, styles.videoCard]}
                onPress={() => navigation.navigate('VideoTopics')}
            >
                <View style={styles.iconCircle}>
                    <Video size={26} color="#fff" />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Video Learning</Text>
                    <Text style={styles.cardSubtitle}>
                        Watch lessons with interactive activities
                    </Text>
                </View>

                <ChevronRight size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>

            {/* Games Card */}
            <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.card, styles.gameCard]}
                onPress={() => navigation.navigate('GamesList')}
            >
                <View style={[styles.iconCircle, { backgroundColor: COLORS.success }]}>
                    <Gamepad2 size={26} color="#fff" />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Offline Games</Text>
                    <Text style={styles.cardSubtitle}>
                        Download and play without internet
                    </Text>
                </View>

                <ChevronRight size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },

    headerWrap: {
        marginBottom: 25,
    },

    header: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },

    subHeader: {
        fontSize: 14,
        marginTop: 6,
        color: COLORS.textSecondary,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 18,
        borderRadius: 16,
        marginBottom: 18,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },

    videoCard: {
        borderLeftWidth: 5,
        borderLeftColor: COLORS.primary,
    },

    gameCard: {
        borderLeftWidth: 5,
        borderLeftColor: COLORS.success,
    },

    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    cardContent: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },

    cardSubtitle: {
        fontSize: 13,
        marginTop: 4,
        color: COLORS.textSecondary,
    },
})
