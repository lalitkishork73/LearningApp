import { VideoItem } from '../types';

export const VIDEO_LIST: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Science',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    duration: 12,
    activities: [
      { minute: 1, type: 'quiz' },
      { minute: 2, type: 'quiz' },
      { minute: 3, type: 'quiz' },
      { minute: 4, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '2',
    title: 'Basics of Mathematics',
    url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    duration: 12,
    activities: [
      { minute: 1, type: 'quiz' },
      { minute: 2, type: 'quiz' },
      { minute: 3, type: 'quiz' },
      { minute: 4, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '3',
    title: 'History Overview',
    url: 'https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8',
    duration: 12,
    activities: [
      { minute: 1, type: 'quiz' },
      { minute: 2, type: 'quiz' },
      { minute: 3, type: 'quiz' },
      { minute: 4, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '4',
    title: 'Introductio of Physics',
    url: 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
    duration: 12,
    activities: [
      { minute: 1, type: 'quiz' },
      { minute: 2, type: 'quiz' },
      { minute: 3, type: 'quiz' },
      { minute: 5, type: 'game' },
      { minute: 6, type: 'game' },
      { minute: 7, type: 'game' },
      { minute: 8, type: 'game' },
      { minute: 9, type: 'game' },
      { minute: 10, type: 'game' },
      { minute: 11, type: 'game' },
      { minute: 12, type: 'game' },
    ],
  },
];
