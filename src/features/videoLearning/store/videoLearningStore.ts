import { create } from 'zustand';

type VideoLearningState = {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  checkpointsCompleted: number[];
  activeCheckpoint: number | null;
  showActivityModal: boolean;

  setPlaying: (val: boolean) => void;
  updateTime: (time: number) => void;
  triggerActivity: (minute: number) => void;
  completeActivity: () => void;
  setDuration: (duration: number) => void;

  currentVideoId: string;
  setCurrentVideo: (id: string) => void;
};

export const useVideoLearningStore = create<VideoLearningState>(set => ({
  isPlaying: true,
  duration: 0,
  currentTime: 0,
  checkpointsCompleted: [],
  activeCheckpoint: null,
  showActivityModal: false,

  currentVideoId: '1',

  setCurrentVideo: id =>
    set({
      currentVideoId: id,
      checkpointsCompleted: [],
      activeCheckpoint: null,
      showActivityModal: false,
      currentTime: 0,
      isPlaying: true,
    }),

  setPlaying: val => set({ isPlaying: val }),
  setDuration: duration => set({ duration }),

  updateTime: time => set({ currentTime: time }),

  triggerActivity: minute =>
    set({
      isPlaying: false,
      activeCheckpoint: minute,
      showActivityModal: true,
    }),

  completeActivity: () =>
    set(state => ({
      checkpointsCompleted: [
        ...state.checkpointsCompleted,
        state.activeCheckpoint!,
      ],
      activeCheckpoint: null,
      showActivityModal: false,
      isPlaying: true,
    })),
}));
