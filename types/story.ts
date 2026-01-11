export interface Scene {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface Story {
  id: string;
  title: string;
  genre: string[];
  characters: string[];
  description: string;
  scenes: Scene[];
  coverImage?: string;
  likes?: string[];
  likesCount?: number;
  userId?: string;
  createdAt: string;
}

export interface StoryInput {
  characters: string[];
  description: string;
  genre: string[];
}

export const GENRE_OPTIONS = [
  'Funny',
  'Educational',
  'Adventure',
  'Fantasy',
  'Happy',
  'Sad',
  'Bedtime Story'
] as const;

export type Genre = typeof GENRE_OPTIONS[number];
