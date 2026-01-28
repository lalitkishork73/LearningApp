import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import { useGamesStore } from '../store/gamesStore';

export const downloadGame = async (gameId: string, zipUrl: string) => {
  const { setDownloading, setGamePath, downloadedGames } = useGamesStore.getState();

   if (downloadedGames[gameId]) return; 

  try {
    setDownloading(gameId);

    const zipPath = `${RNFS.DocumentDirectoryPath}/${gameId}.zip`;
    const gameFolder = `${RNFS.DocumentDirectoryPath}/games/${gameId}`;

    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/games`);

    await RNFS.downloadFile({
      fromUrl: zipUrl,
      toFile: zipPath,
    }).promise;

    await unzip(zipPath, gameFolder);

    setGamePath(gameId, gameFolder);
  } catch (err) {
    console.log('Download failed:', err);
  } finally {
    setDownloading(null);
  }
};
