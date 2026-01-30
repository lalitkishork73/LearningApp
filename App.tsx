import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainApp from './src/app/App';
import { useEffect } from 'react';
import { useGamesStore } from './src/features/games/store/gamesStore';
import { COLORS } from './src/theme/colors';

export default function App() {


  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    useGamesStore.getState().loadPersisted();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.background }} >
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <MainApp />
    </SafeAreaProvider>
  );
}
