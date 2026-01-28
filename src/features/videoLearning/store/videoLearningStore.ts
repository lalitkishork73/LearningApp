import { create } from 'zustand';

type ActivityType = 'quiz' | 'game' | null;

type VideoLearningState = {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  checkpointsCompleted: number[];
  activeCheckpoint: number | null;
  showActivityModal: boolean;
  activityType: ActivityType;

  currentVideoId: string;

  setPlaying: (val: boolean) => void;
  updateTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setCurrentVideo: (id: string) => void;

  triggerActivity: (minute: number, type: ActivityType) => void;
  completeActivity: () => void;
};

export const useVideoLearningStore = create<VideoLearningState>(set => ({
  isPlaying: true,
  duration: 0,
  currentTime: 0,
  checkpointsCompleted: [],
  activeCheckpoint: null,
  showActivityModal: false,
  activityType: null,
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

  triggerActivity: (minute, type) =>
    set({
      isPlaying: false,
      activeCheckpoint: minute,
      showActivityModal: true,
      activityType: type,
    }),

  completeActivity: () =>
    set(state => ({
      checkpointsCompleted: [
        ...state.checkpointsCompleted,
        state.activeCheckpoint!,
      ],
      activeCheckpoint: null,
      activityType: null,
      showActivityModal: false,
      isPlaying: true,
    })),
}));
