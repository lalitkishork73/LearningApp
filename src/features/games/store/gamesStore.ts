import { create } from 'zustand';
import { storage } from '../../../services/storage/storage';

type GamesState = {
  downloadedGames: Record<string, string>;
  downloading: string | null;
  setGamePath: (id: string, path: string) => void;
  setDownloading: (id: string | null) => void;
  loadPersisted: () => Promise<void>;
};

export const useGamesStore = create<GamesState>((set, get) => ({
  downloadedGames: {},
  downloading: null,

  setGamePath: async (id, path) => {
    const updated = { ...get().downloadedGames, [id]: path };
    set({ downloadedGames: updated });
    await storage.set('DOWNLOADED_GAMES', JSON.stringify(updated));
  },

  setDownloading: id => set({ downloading: id }),

  loadPersisted: async () => {
    const saved = await storage.get('DOWNLOADED_GAMES');
    if (saved) set({ downloadedGames: JSON.parse(saved) });
  },
}));
