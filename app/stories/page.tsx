'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StoryCard from '@/components/StoryCard';
import StoryPlayer from '@/components/StoryPlayer';
import Footer from '@/components/Footer';
import { Story } from '@/types/story';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AllStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    fetchPublicStories();
  }, [user, router]);

  const fetchPublicStories = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/stories/public');
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch stories');
      }

      const data = await response.json();
      setStories(data.stories || []);
    } catch (err: any) {
      console.error('Error fetching public stories:', err);
      setError(err.message || 'Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayStory = (story: Story) => {
    setSelectedStory(story);
  };

  const handleClosePlayer = () => {
    setSelectedStory(null);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Page Heading */}
      <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-5xl animate-bounce">🌟</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Community Stories
            </h1>
            <span className="text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>🎭</span>
          </div>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Discover Amazing Stories from Young Authors Around the World! �
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
            <p className="text-xl text-gray-600">Loading stories...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">😔</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
              {error}
            </p>
            <button
              onClick={fetchPublicStories}
              className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && stories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Stories Yet!</h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
              Be the first to share your creative stories with others! 🎨
            </p>
            <button
              onClick={() => router.push('/?create=true')}
              className="bg-linear-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              ✨ Create a Story
            </button>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && !error && stories.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onPlay={handlePlayStory}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Story Player Modal */}
      {selectedStory && (
        <StoryPlayer story={selectedStory} onClose={handleClosePlayer} />
      )}
    </div>
  );
}
