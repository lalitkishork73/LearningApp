import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize,
} from 'lucide-react-native';
import { useVideoLearningStore } from '../store/videoLearningStore';
import { videoController } from '../logic/videoLearningController';
import { COLORS } from '../../../theme/colors'

type Props = {
  onSeek: (time: number) => void;
  onToggleFullscreen: () => void;
};

const VideoControls: React.FC<Props> = ({ onSeek, onToggleFullscreen }) => {
  const { isPlaying, setPlaying, currentTime, duration, checkpointsCompleted } =
    useVideoLearningStore();

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSlidingComplete = (value: number) => {
    videoController.handleSeek(value);
    onSeek(value);
  };

  const seekBy = (seconds: number) => {
    let newTime = currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    videoController.handleSeek(newTime);
    onSeek(newTime);
  };

  return (
    <View style={styles.container}>
      {/* Timeline */}
      <View style={styles.timelineContainer}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor={COLORS.textPrimary}
          maximumTrackTintColor={COLORS.textSecondary}
          thumbTintColor={COLORS.textPrimary}
          onSlidingComplete={handleSlidingComplete}
        />

        {/* Activity Markers */}
        {Array.from({ length: Math.floor(duration / 60) }).map((_, i) => {
          const minute = i + 1;
          const left = ((minute * 60) / duration) * 100;
          const completed = checkpointsCompleted.includes(minute);

          return (
            <View
              key={i}
              style={[
                styles.marker,
                {
                  left: `${left}%`,
                  backgroundColor: completed ? COLORS.success : COLORS.primary,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Controls Row */}
      <View style={styles.controlsRow}>
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>

        <TouchableOpacity onPress={() => setPlaying(!isPlaying)}>
          {isPlaying ? (
            <Pause color={COLORS.textPrimary} size={16} />
          ) : (
            <Play color={COLORS.textPrimary} size={16} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => seekBy(-10)}>
          <SkipBack color={COLORS.textPrimary} size={16} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => seekBy(10)}>
          <SkipForward color={COLORS.textPrimary} size={16} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggleFullscreen}>
          <Maximize color={COLORS.textPrimary} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoControls;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  timelineContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  marker: {
    position: 'absolute',
    width: 4,
    height: 4,
    top: -2,
    zIndex: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: { color: COLORS.textPrimary, fontSize: 12 },
});
