import { create } from 'zustand';
import { storage } from '../../../services/storage/storage';

const getKey = (videoId: string) => `VIDEO_PROGRESS_${videoId}`;

type ActivityMode = 'menu' | 'quiz' | 'game' | 'fun' | null;

type VideoLearningState = {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  checkpointsCompleted: number[];
  activeCheckpoint: number | null;
  showActivityModal: boolean;
  activityMode: ActivityMode;

  currentVideoId: string;

  setPlaying: (val: boolean) => void;
  updateTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setCurrentVideo: (id: string) => void;
  setActivityMode: (mode: ActivityMode) => void;
  triggerActivity: (minute: number) => void;
  completeActivity: () => void;
  loadVideoProgress: (videoId: string) => Promise<void>;
  persistVideoProgress: () => Promise<void>;
  videoProgressMap: Record<
    string,
    {
      lastTime: number;
      checkpointsCompleted: number[];
      duration?: number;
      completed?: boolean;
    }
  >;

  loadAllVideoProgress: () => Promise<void>;
  setVideoDuration: (videoId: string, duration: number) => Promise<void>;
  markVideoCompleted: (videoId: string) => Promise<void>;
};

export const useVideoLearningStore = create<VideoLearningState>(set => ({
  isPlaying: true,
  duration: 0,
  currentTime: 0,
  checkpointsCompleted: [],
  activeCheckpoint: null,
  showActivityModal: false,
  activityMode: null,
  currentVideoId: '1',
  videoProgressMap: {},

  setCurrentVideo: id => {
    const saved = useVideoLearningStore.getState().videoProgressMap[id];

    set({
      currentVideoId: id,
      checkpointsCompleted: saved?.checkpointsCompleted || [],
      activeCheckpoint: null,
      showActivityModal: false,
      currentTime: saved?.lastTime || 0,
      isPlaying: true,
      duration: saved?.duration || 0,
    });
  },
  setActivityMode: (mode: ActivityMode) => set({ activityMode: mode }),

  setPlaying: val => set({ isPlaying: val }),
  setDuration: duration => set({ duration }),
  updateTime: time => set({ currentTime: time }),

  triggerActivity: minute =>
    set({
      isPlaying: false,
      activeCheckpoint: minute,
      showActivityModal: true,
      activityMode: 'menu',
    }),

  completeActivity: () =>
    set(state => {
      if (!state.activeCheckpoint) return state;

      const updatedCheckpoints = state.checkpointsCompleted.includes(
        state.activeCheckpoint,
      )
        ? state.checkpointsCompleted
        : [...state.checkpointsCompleted, state.activeCheckpoint];

      const updated = {
        checkpointsCompleted: updatedCheckpoints,
        activeCheckpoint: null,
        activityMode: null,
        showActivityModal: false,
        isPlaying: true,
      };

      setTimeout(() => {
        useVideoLearningStore.getState().persistVideoProgress();
      }, 0);

      return updated;
    }),

  loadVideoProgress: async videoId => {
    const saved = await storage.get(getKey(videoId));
    if (!saved) return;

    const data = JSON.parse(saved);
    set(state => ({
      currentTime: data.lastTime || 0,
      checkpointsCompleted: data.checkpointsCompleted || [],
      videoProgressMap: {
        ...state.videoProgressMap,
        [videoId]: data,
      },
    }));
  },

  persistVideoProgress: async () => {
    const {
      currentVideoId,
      currentTime,
      checkpointsCompleted,
      videoProgressMap,
      duration,
    } = useVideoLearningStore.getState();

    const isCompleted = duration > 0 && currentTime >= duration * 0.95;

    const payload = {
      lastTime: currentTime,
      checkpointsCompleted,
      duration,
      completed: isCompleted,
    };

    await storage.set(getKey(currentVideoId), JSON.stringify(payload));

    set(state => ({
      videoProgressMap: {
        ...state.videoProgressMap,
        [currentVideoId]: payload,
      },
    }));
  },

  loadAllVideoProgress: async () => {
    const map: any = {};

    for (let i = 1; i <= 10; i++) {
      // or VIDEO_LIST length
      const key = `VIDEO_PROGRESS_${i}`;
      const saved = await storage.get(key);
      if (saved) map[i] = JSON.parse(saved);
    }

    set({ videoProgressMap: map });
  },

  setVideoDuration: async (videoId, duration) => {
    const key = getKey(videoId);
    const existing = await storage.get(key);

    let parsed = {
      lastTime: 0,
      checkpointsCompleted: [],
      duration,
      completed: false,
    };

    if (existing) {
      const old = JSON.parse(existing);
      parsed = { ...old, duration };
    }

    await storage.set(key, JSON.stringify(parsed));

    set(state => ({
      videoProgressMap: {
        ...state.videoProgressMap,
        [videoId]: parsed,
      },
    }));
  },

  markVideoCompleted: async videoId => {
    const key = getKey(videoId);
    const existing = await storage.get(key);

    if (!existing) return;

    const parsed = JSON.parse(existing);
    const updated = { ...parsed, completed: true };

    await storage.set(key, JSON.stringify(updated));

    set(state => ({
      videoProgressMap: {
        ...state.videoProgressMap,
        [videoId]: updated,
      },
    }));
  },
}));
