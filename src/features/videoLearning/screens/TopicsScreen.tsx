import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const TopicsScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Select Topic</Text>
            <Button title="Start Video" onPress={() => navigation.navigate('VideoPlayer')} />
        </View>
    )
}

export default TopicsScreen
