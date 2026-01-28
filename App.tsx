import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainApp from './src/app/App';
import { useEffect } from 'react';
import { useGamesStore } from './src/features/games/store/gamesStore';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    useGamesStore.getState().loadPersisted();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainApp />
    </SafeAreaProvider>
  );
}
