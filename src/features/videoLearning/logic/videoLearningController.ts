import { AppState } from 'react-native';
import { useVideoLearningStore } from '../store/videoLearningStore';

let appState = AppState.currentState;
let listenerInitialized = false;

export const videoController = {
  handleProgress: (time: number) => {
    const {
      checkpointsCompleted,
      activeCheckpoint,
      triggerActivity,
      updateTime,
      duration,
    } = useVideoLearningStore.getState();

    updateTime(time);

    if (duration < 60 || activeCheckpoint !== null) return;

    const minute = Math.floor(time / 60);

    if (minute > 0 && !checkpointsCompleted.includes(minute)) {
      const type = Math.random() > 0.5 ? 'quiz' : 'game';
      triggerActivity(minute, type);
    }
  },

  handleSeek: (seekTime: number, playerRef?: any) => {
  const {
    checkpointsCompleted,
    activeCheckpoint,
    triggerActivity,
    updateTime,
  } = useVideoLearningStore.getState()

  if (activeCheckpoint !== null) return

  const lastCompleted =
    checkpointsCompleted.length > 0
      ? Math.max(...checkpointsCompleted)
      : 0

  const maxAllowedTime = (lastCompleted + 1) * 60

  // 🚫 Prevent skipping ahead
  if (seekTime > maxAllowedTime) {
    playerRef?.seek(maxAllowedTime)
    return
  }

  updateTime(seekTime)

  // If user jumped to an incomplete checkpoint, trigger it
  const targetMinute = Math.floor(seekTime / 60)
  if (!checkpointsCompleted.includes(targetMinute) && targetMinute > 0) {
    const type = Math.random() > 0.5 ? 'quiz' : 'game'
    triggerActivity(targetMinute, type)
  }
},


  handleActivityCompletion: () => {
    useVideoLearningStore.getState().completeActivity();
  },

  initAppStateListener: () => {
    if (listenerInitialized) return;
    listenerInitialized = true;

    AppState.addEventListener('change', nextState => {
      if (appState.match(/active/) && nextState.match(/inactive|background/)) {
        useVideoLearningStore.getState().setPlaying(false);
      }
      appState = nextState;
    });
  },

  resetForNewVideo: () => {
    useVideoLearningStore.setState({
      checkpointsCompleted: [],
      activeCheckpoint: null,
      showActivityModal: false,
      currentTime: 0,
      isPlaying: true,
    });
  },
};
