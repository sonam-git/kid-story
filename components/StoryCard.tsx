'use client';

import { useState } from 'react';
import { Story } from '@/types/story';
import { Play, Trash2, Heart } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface StoryCardProps {
  story: Story;
  onPlay: (story: Story) => void;
  onDelete?: (id: string) => void;
  onLike?: (storyId: string) => Promise<{ liked: boolean; likesCount: number }>;
  showLike?: boolean;
}

export default function StoryCard({ story, onPlay, onDelete, onLike, showLike = false }: StoryCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(
    story.likes?.includes(user?.id || '') || false
  );
  const [likesCount, setLikesCount] = useState(story.likesCount || 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!onLike || isLiking) return;
    
    setIsLiking(true);
    try {
      const result = await onLike(story.id);
      setIsLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (error) {
      console.error('Error liking story:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Safely get the cover image URL (handle corrupt data with robust validation)
  const getCoverImageUrl = (): string | null => {
    if (!story.coverImage) return null;
    
    // Must be a non-empty string
    if (typeof story.coverImage !== 'string') {
      console.warn('Invalid coverImage type:', typeof story.coverImage);
      return null;
    }
    
    const trimmed = story.coverImage.trim();
    
    // Check for empty or invalid strings
    if (!trimmed || trimmed === '' || trimmed === '[object Object]' || trimmed === 'undefined' || trimmed === 'null') {
      console.warn('Invalid coverImage value:', trimmed);
      return null;
    }
    
    // Validate it's a proper URL
    try {
      const url = new URL(trimmed);
      // Additional check: must have http or https protocol
      if (!url.protocol.startsWith('http') && !url.protocol.startsWith('data:')) {
        console.warn('Invalid URL protocol:', url.protocol);
        return null;
      }
      return trimmed;
    } catch (error) {
      console.warn('Failed to parse coverImage as URL:', trimmed, error);
      return null;
    }
  };
  
  const coverImageUrl = getCoverImageUrl();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Cover Image */}
      <div className="relative h-48 bg-linear-to-br from-purple-300 to-pink-300">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            unoptimized={coverImageUrl.startsWith('data:') || coverImageUrl.includes('placehold.co') || coverImageUrl.includes('replicate.delivery')}
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

        {/* Like Button and Count (for All Stories) */}
        {showLike && (
          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
              />
              <span className="font-semibold">{likesCount}</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onPlay(story)}
            className="flex-1 bg-linear-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
