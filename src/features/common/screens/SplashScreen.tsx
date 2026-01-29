import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'
import { COLORS } from '../../../theme/colors'

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>

const SplashScreen = ({ navigation }: Props) => {
    const pulseAnim = useRef(new Animated.Value(0.6)).current

    useEffect(() => {
        // Pulse animation loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.6,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start()

        const timer = setTimeout(() => {
            navigation.replace('Home')
        }, 1800)

        return () => clearTimeout(timer)
    }, [navigation, pulseAnim])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Learning App</Text>

            <Animated.Text style={[styles.subtitle, { opacity: pulseAnim }]}>
                Preparing your experience...
            </Animated.Text>
        </View>
    )
}

export default SplashScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 1,
    },

    subtitle: {
        marginTop: 18,
        fontSize: 14,
        color: '#E0E7FF',
        letterSpacing: 0.5,
    },
})
