import React, { useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useVideoLearningStore } from '../store/videoLearningStore';
import ActivityModal from '../components/ActivityModal';
import VideoPlayer from '../components/VideoPlayer';
import { VIDEO_LIST } from '../data/mockData';
import { COLORS } from '../../../theme/colors';
import { SvgUri } from 'react-native-svg';
import VideoProgressInfo from '../components/VideoProgressInfo';

const VideoPlayerScreen = () => {
  const currentVideoId = useVideoLearningStore(s => s.currentVideoId);
  const setCurrentVideo = useVideoLearningStore(s => s.setCurrentVideo);

  const otherVideos = useMemo(
    () => VIDEO_LIST.filter(v => v.id !== currentVideoId),
    [currentVideoId],
  );

  const renderHeader = () => (
    <>
      <VideoPlayer />
      <VideoProgressInfo />
      <ActivityModal />
      <Text style={styles.upNext}>Up Next</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={otherVideos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setCurrentVideo(item.id)}
          >
            <SvgUri
              width="70"
              height="70"
              uri="https://www.svgrepo.com/show/528782/video-library.svg"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.duration}>{`${item.duration} min`}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  playerWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    margin: 12,
    backgroundColor: 'black',
    elevation: 4,
  },

  infoSection: {
    paddingHorizontal: 16,
    marginTop: 4,
  },

  videoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  meta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.primary,
  },

  upNext: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    color: COLORS.textPrimary,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },

  thumb: {
    width: 100,
    height: 70,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 10,
    color: COLORS.textPrimary,
  },

  duration: {
    fontSize: 12,
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 8,
    color: COLORS.textSecondary,
  },
});
