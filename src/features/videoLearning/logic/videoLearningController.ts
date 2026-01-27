import { useVideoLearningStore } from '../store/videoLearningStore';
import { AppState } from 'react-native'

export const handleVideoProgress = (time: number) => {
  const { checkpointsCompleted, activeCheckpoint, triggerActivity } =
    useVideoLearningStore.getState();

  const minute = Math.floor(time / 60);

  if (
    minute > 0 &&
    !checkpointsCompleted.includes(minute) &&
    activeCheckpoint !== minute
  ) {
    triggerActivity(minute);
  }
};


let lastKnownTime = 0
let appState = AppState.currentState

export const videoController = {
    /** Called every second from onProgress */
    handleProgress: (time: number) => {
        const {
            checkpointsCompleted,
            activeCheckpoint,
            triggerActivity,
            updateTime,
            duration,
        } = useVideoLearningStore.getState()

        updateTime(time)
        lastKnownTime = time

        // If video shorter than 60 sec, no activity required
        if (duration < 60) return

        const minute = Math.floor(time / 60)

        if (
            minute > 0 &&
            !checkpointsCompleted.includes(minute) &&
            activeCheckpoint !== minute
        ) {
            triggerActivity(minute)
        }
    },

    /** Called when user seeks manually */
    handleSeek: (seekTime: number) => {
        const { checkpointsCompleted, triggerActivity } =
            useVideoLearningStore.getState()

        const targetMinute = Math.floor(seekTime / 60)

        // Find first incomplete checkpoint before target
        for (let m = 1; m <= targetMinute; m++) {
            if (!checkpointsCompleted.includes(m)) {
                triggerActivity(m)
                return
            }
        }
    },

    /** Called when activity completes */
    handleActivityCompletion: () => {
        const { completeActivity } = useVideoLearningStore.getState()
        completeActivity()
    },

    /** Pause video when app goes background */
    initAppStateListener: () => {
        AppState.addEventListener('change', (nextState) => {
            if (appState.match(/active/) && nextState.match(/inactive|background/)) {
                useVideoLearningStore.getState().setPlaying(false)
            }
            appState = nextState
        })
    },

    /** Reset state when a new video starts */
    resetForNewVideo: () => {
        useVideoLearningStore.setState({
            checkpointsCompleted: [],
            activeCheckpoint: null,
            showActivityModal: false,
            currentTime: 0,
            isPlaying: true,
        })
        lastKnownTime = 0
    },
}
