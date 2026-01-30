import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../app/navigation/types'

const TopicsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Select Topic</Text>
            <Button title="Start Video" onPress={() => navigation.navigate('VideoPlayer', {})} />
        </View>
    )
}

export default TopicsScreen
