import React from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import QuizActivity from './QuizActivity'
import GameActivity from './GameActivity'
import FunActivity from './FunActivity'
import { COLORS } from '../../../theme/colors'
import { Brain, Gamepad2, Sparkles, Play } from 'lucide-react-native'

const ActivityModal = () => {
    const {
        showActivityModal,
        activityMode,
        setActivityMode,
        completeActivity,
    } = useVideoLearningStore()

    if (!showActivityModal) return null

    return (
        <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>

                    {activityMode === 'menu' && (
                        <>
                            <Text style={styles.title}>Choice Time!</Text>
                            <Text style={styles.subTitle}>Take a quick break or continue learning</Text>

                            <View style={styles.grid}>
                                <Option
                                    label="Quick Quiz"
                                    icon={<Brain size={26} color={COLORS.primary} />}
                                    onPress={() => setActivityMode('quiz')}
                                />
                                <Option
                                    label="Practice Game"
                                    icon={<Gamepad2 size={26} color="#22C55E" />}
                                    onPress={() => setActivityMode('game')}
                                />
                                <Option
                                    label="Fun Activity"
                                    icon={<Sparkles size={26} color="#F59E0B" />}
                                    onPress={() => setActivityMode('fun')}
                                />
                                <Option
                                    label="Keep Watching"
                                    icon={<Play size={26} color="#6366F1" />}
                                    onPress={completeActivity}
                                />
                            </View>
                        </>
                    )}

                    {activityMode === 'quiz' && <QuizActivity />}
                    {activityMode === 'game' && <GameActivity />}
                    {activityMode === 'fun' && <FunActivity />}

                </View>
            </View>
        </Modal>
    )
}

const Option = ({ label, icon, onPress }: any) => (
    <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.iconWrap}>{icon}</View>
        <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
)

export default ActivityModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        height: '60%',
        backgroundColor: COLORS.background,
        borderRadius: 20,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: COLORS.textPrimary,
    },

    subTitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 20,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    option: {
        width: '48%',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    iconWrap: {
        marginBottom: 8,
    },

    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
})
