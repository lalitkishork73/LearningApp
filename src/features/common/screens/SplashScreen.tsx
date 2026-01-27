import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>

const SplashScreen = ({ navigation }: Props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home')
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Learning App</Text>
            <ActivityIndicator size="large" color="#4A90E2" />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
})
