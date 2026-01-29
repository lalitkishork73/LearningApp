import { VideoItem } from '../types';

export const VIDEO_LIST: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Science',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    duration: 12,
    activities: [
      { minute: 2, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '2',
    title: 'Basics of Mathematics',
    url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    duration: 12,
    activities: [
      { minute: 2, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '3',
    title: 'History Overview',
    url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
    duration: 12,
    activities: [
      { minute: 2, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
  {
    id: '4',
    title: 'Introductio of Physics',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 12,
    activities: [
      { minute: 2, type: 'quiz' },
      { minute: 5, type: 'game' },
    ],
  },
];
