import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Brain, Gamepad2, Sparkles, Play } from 'lucide-react-native'
import { COLORS } from '../../../theme/colors'
import Option from './Option'

const ActivityMenu = ({ setActivityMode, completeActivity }: any) => (
    <>
        <Text style={styles.title}>Choice Time!</Text>
        <Text style={styles.subTitle}>
            Take a quick break or continue learning
        </Text>

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
)

export default React.memo(ActivityMenu)

const styles = StyleSheet.create({
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
})
