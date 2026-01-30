import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../../theme/colors'

const Option = ({ label, icon, onPress }: any) => (
    <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.iconWrap}>{icon}</View>
        <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
)

export default React.memo(Option)

const styles = StyleSheet.create({
    option: {
        width: '48%',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 14,
        elevation: 3,
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
