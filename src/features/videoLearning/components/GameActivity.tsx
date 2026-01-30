import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useGamesStore } from '../../games/store/gamesStore';
import { useVideoLearningStore } from '../store/videoLearningStore';
import { COLORS } from '../../../theme/colors'
import { useWindowDimensions } from 'react-native'

const GameActivity = () => {
  const { downloadedGames } = useGamesStore();
  const { completeActivity } = useVideoLearningStore();
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height


  const gamePath = useMemo(() => {
    const games = Object.values(downloadedGames);
    if (games.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
  }, [downloadedGames]);


  if (!gamePath) {
    return (
      <View style={styles.noGameContainer}>
        <Text style={styles.noGame}>No game available!</Text>
        <Text style={styles.exitBottom} onPress={completeActivity}>
          Exit Game
        </Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { flexDirection: isLandscape ? 'row' : 'column' },
    ]}>

      <View style={styles.gameWrapper}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: `file://${gamePath}/index.html` }}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          allowUniversalAccessFromFileURLs
          allowingReadAccessToURL={`file://${gamePath}/`}
          mixedContentMode="always"
        />
      </View>

      <Text
        style={[
          styles.exitBottom,
          isLandscape ? styles.exitSide : styles.exitBottom
        ]}
        onPress={completeActivity}
      >
        Exit Game
      </Text>

    </View>
  )

};

export default GameActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    backgroundColor: COLORS.background,
  },

  gameWrapper: {
    flex: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden', 
  },


  exitBottom: {
    textAlign: 'center',
    padding: 14,
    backgroundColor: COLORS.primary,
    color: COLORS.background,
  },

  exitSide: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
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
})

