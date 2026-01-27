import { useVideoLearningStore } from '../store/videoLearningStore';

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
