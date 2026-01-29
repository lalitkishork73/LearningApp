import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useGamesStore } from '../../games/store/gamesStore';
import { useVideoLearningStore } from '../store/videoLearningStore';
import { COLORS } from '../../../theme/colors'

const GameActivity = () => {
  const { downloadedGames } = useGamesStore();
  const { completeActivity } = useVideoLearningStore();

  const gamePath = Object.values(downloadedGames)[0];
  console.log(gamePath);

  if (!gamePath) {
    return (
      <View style={styles.noGameContainer}>
        <Text style={styles.noGame}>No game available!</Text>
        <Text style={styles.exit} onPress={completeActivity}>
          Exit Game
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <WebView source={{ uri: `file://${gamePath}/index.html` }} /> */}
      <WebView
        source={{ uri: `file://${gamePath}/index.html` }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowingReadAccessToURL={`file://${gamePath}/`}
        mixedContentMode="always"
      />
      <Text style={styles.exit} onPress={completeActivity}>
        Exit Game
      </Text>
    </View>
  );
};

export default GameActivity;

const styles = StyleSheet.create({
  exit: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: COLORS.primary,
    color: COLORS.background,
  },
  noGame: {
    textAlign: 'center',
    padding: 10,
    color: COLORS.textPrimary,
  },
  noGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});
