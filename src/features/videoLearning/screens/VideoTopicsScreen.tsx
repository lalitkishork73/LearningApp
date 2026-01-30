import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { useVideoLearningStore } from '../store/videoLearningStore';
import { VIDEO_LIST } from '../data/mockData';
import { COLORS } from '../../../theme/colors';
import { PlayCircle, CheckCircle } from 'lucide-react-native';
import { SvgUri } from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoTopics'>;

const VideoTopicsScreen = ({ navigation }: Props) => {
  const videoProgressMap = useVideoLearningStore(s => s.videoProgressMap);
  const setCurrentVideo = useVideoLearningStore(s => s.setCurrentVideo);

  React.useEffect(() => {
    useVideoLearningStore.getState().loadAllVideoProgress();
  }, []);

  const renderItem = ({ item }: any) => {
    const durationSec = videoProgressMap[item.id]?.duration || 0;
    const progress = videoProgressMap[item.id]?.lastTime || 0;
    const percent = durationSec ? progress / durationSec : 0;
    const isCompleted = videoProgressMap[item.id]?.completed;

    const handleOnPress = () => {
      navigation.navigate('VideoPlayer', { topicId: item.id });
      setCurrentVideo(item.id);
    };


    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={handleOnPress}
      >
        {/* Thumbnail */}
        <View style={styles.thumbnail}>
          <SvgUri
            width="70"
            height="70"
            uri={'https://www.svgrepo.com/show/528782/video-library.svg'}
            // style={styles.thumbnail}
          />
        </View>

        {/* Info Section */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

          <Text style={styles.meta}>
            {durationSec
              ? `${Math.ceil(durationSec / 60)} min`
              : `${item.duration} min`}
            {'  •  '}
            {Math.ceil(percent * 100)}% watched
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percent * 100}%` }]}
            />
          </View>

          {/* Status Row */}
          <View style={styles.statusRow}>
            {!isCompleted && percent > 0 && (
              <View style={styles.continueWrap}>
                <PlayCircle size={16} color={COLORS.primary} />
                <Text style={styles.continue}>Continue Watching</Text>
              </View>
            )}

            {isCompleted && (
              <View style={styles.completedWrap}>
                <CheckCircle size={16} color={COLORS.success} />
                <Text style={styles.completed}>Completed</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Learning Topics</Text>

      <FlatList
        style={{ flex: 1 }}
        data={VIDEO_LIST}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default VideoTopicsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: COLORS.textPrimary,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  thumbnail: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 70,
    // height: 70,
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  meta: {
    fontSize: 12,
    marginTop: 6,
    color: COLORS.textSecondary,
  },

  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.primary,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  continueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  continue: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: '600',
  },

  completedWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  completed: {
    marginLeft: 6,
    color: COLORS.success,
    fontWeight: '600',
  },
});
