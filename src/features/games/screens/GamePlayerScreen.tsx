import React from 'react'
import { WebView } from 'react-native-webview'
import { useRoute } from '@react-navigation/native'
import { useGamesStore } from '../store/gamesStore'

const GamePlayerScreen = () => {
    const route = useRoute<any>()
    const { gameId } = route.params
    const { downloadedGames } = useGamesStore()

    const gamePath = downloadedGames[gameId]

    console.log(gamePath)

    return (
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

    )
}

export default GamePlayerScreen
