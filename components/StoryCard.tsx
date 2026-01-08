'use client';

import { Story } from '@/types/story';
import { Play, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface StoryCardProps {
  story: Story;
  onPlay: (story: Story) => void;
  onDelete?: (id: string) => void;
}

export default function StoryCard({ story, onPlay, onDelete }: StoryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-300 to-pink-300">
        {story.coverImage ? (
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            📚
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
          {story.title}
        </h3>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {story.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Characters */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm font-semibold mb-1">Characters:</p>
          <p className="text-gray-700 line-clamp-1">
            {story.characters.join(', ')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onPlay(story)}
            className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="white" />
            Play Story
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(story.id)}
              className="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 transition-all"
              title="Delete story"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
