import { AppState } from 'react-native';
import { useVideoLearningStore } from '../store/videoLearningStore';
import { VIDEO_LIST } from '../data/mockData';

let appState = AppState.currentState;
let listenerInitialized = false;
let lastSaved = 0;

export const videoController = {
  handleProgress: (time: number) => {
    const {
      activeCheckpoint,
      triggerActivity,
      updateTime,
      duration,
      persistVideoProgress,
      markVideoCompleted,
      currentVideoId,
      videoProgressMap,
      checkpointsCompleted,
    } = useVideoLearningStore.getState();

    updateTime(time);

    if (duration < 30) return;

    if (
      duration > 0 &&
      time / duration >= 0.95 &&
      !videoProgressMap[currentVideoId]?.completed
    ) {
      markVideoCompleted(currentVideoId);
    }

    if (Math.abs(time - lastSaved) >= 5) {
      persistVideoProgress();
      lastSaved = time;
    }

    if (activeCheckpoint !== null) return;

    const video = VIDEO_LIST.find(v => v.id === currentVideoId);
    if (!video?.activities?.length) return;

    for (const activity of video.activities) {
      const triggerSecond = activity.minute * 60;

      if (
        time >= triggerSecond &&
        !checkpointsCompleted.includes(activity.minute)
      ) {
        triggerActivity(activity.minute);
        return;
      }
    }
  },

  handleSeek: (seekTime: number, playerRef?: any) => {
    const {
      checkpointsCompleted,
      activeCheckpoint,
      triggerActivity,
      currentVideoId,
    } = useVideoLearningStore.getState();

    if (activeCheckpoint !== null) return;

    const video = VIDEO_LIST.find(v => v.id === currentVideoId);
    if (!video?.activities?.length) return;

    for (const activity of video.activities) {
      const triggerSecond = activity.minute * 60;

      if (
        seekTime >= triggerSecond &&
        !checkpointsCompleted.includes(activity.minute)
      ) {
        playerRef?.seek(triggerSecond);
        triggerActivity(activity.minute);
        return;
      }
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
