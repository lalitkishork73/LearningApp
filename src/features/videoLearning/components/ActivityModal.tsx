import React, { useEffect } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    ScrollView,
    BackHandler,
} from 'react-native'
import { useVideoLearningStore } from '../store/videoLearningStore'
import QuizActivity from './QuizActivity'
import GameActivity from './GameActivity'
import FunActivity from './FunActivity'
import ActivityMenu from './ActivityMenu'
import { COLORS } from '../../../theme/colors'

const ActivityModal = () => {
    const { showActivityModal, activityMode, setActivityMode, completeActivity } =
        useVideoLearningStore()

    const { width, height } = useWindowDimensions()
    const isLandscape = width > height

    const goBackToMenu = () => setActivityMode('menu')

    useEffect(() => {
        const onBackPress = () => {
            if (activityMode !== 'menu') {
                setActivityMode('menu')
                return true
            }
            return false
        }

        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        )
        return () => subscription.remove()
    }, [activityMode])

    if (!showActivityModal) return null

    return (
        <Modal
            visible={showActivityModal}
            transparent
            animationType="fade"
            presentationStyle="overFullScreen"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.card,
                        isLandscape ? styles.cardLandscape : styles.cardPortrait,
                    ]}
                >
                    {activityMode !== 'menu' && (
                        <View style={styles.headerRow}>
                            <TouchableOpacity onPress={goBackToMenu} style={styles.backBtn}>
                                <Text style={styles.backText}>← Back</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        style={{ flex: 1 }}
                    >
                        {activityMode === 'menu' && (
                            <ActivityMenu
                                setActivityMode={setActivityMode}
                                completeActivity={completeActivity}
                            />
                        )}

                        {activityMode === 'quiz' && <QuizActivity />}
                        {activityMode === 'game' && <GameActivity />}
                        {activityMode === 'fun' && <FunActivity />}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default React.memo(ActivityModal)

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        backgroundColor: COLORS.background,
        borderRadius: 20,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },

    cardPortrait: {
        width: '100%',
        height: '100%',
    },

    cardLandscape: {
        width: '90%',
        height: '95%',
    },

    headerRow: {
        width: '100%',
        marginBottom: 10,
    },

    backBtn: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: COLORS.card,
    },

    backText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
})
