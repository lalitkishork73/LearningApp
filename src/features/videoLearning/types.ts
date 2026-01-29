export type ActivityConfig = {
  minute: number;
  type: 'quiz' | 'game';
};

export type VideoItem = {
  id: string;
  title: string;
  url: string;
  duration?: number;
  activities?: ActivityConfig[];
};
