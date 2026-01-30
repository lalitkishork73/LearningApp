import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigation/RootNavigator'
import { StatusBar } from 'react-native';
import { COLORS } from '../theme/colors'
import { enableScreens } from 'react-native-screens'

enableScreens()

function App() {
  return (
    <NavigationContainer >
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content" 
      />
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default App