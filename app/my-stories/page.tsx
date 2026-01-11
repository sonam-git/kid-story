'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StoryCard from '@/components/StoryCard';
import StoryPlayer from '@/components/StoryPlayer';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import Footer from '@/components/Footer';
import { Story } from '@/types/story';
import { apiStorageService } from '@/services/apiStorageService';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function MyStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    // Load stories from MongoDB API
    fetchStories();
  }, [user, router]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError('');
      const loadedStories = await apiStorageService.getStories();
      setStories(loadedStories);
    } catch (err: any) {
      console.error('Error fetching stories:', err);
      if (err.message === 'Not authenticated') {
        router.push('/login');
      } else {
        setError(err.message || 'Failed to load stories');
      }
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

  const handleDeleteStory = (id: string) => {
    const story = stories.find(s => s.id === id);
    if (story) {
      setStoryToDelete(story);
    }
  };

  const confirmDelete = async () => {
    if (storyToDelete) {
      try {
        setDeleteError('');
        setSuccessMessage('');
        await apiStorageService.deleteStory(storyToDelete.id);
        setStories(stories.filter(s => s.id !== storyToDelete.id));
        setStoryToDelete(null);
        setSuccessMessage('Story deleted successfully! All images have been removed.');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err: any) {
        console.error('Error deleting story:', err);
        setStoryToDelete(null);
        setDeleteError(err.message || 'Failed to delete story. Please try again.');
        
        // Auto-hide error message after 7 seconds
        setTimeout(() => {
          setDeleteError('');
        }, 7000);
      }
    }
  };

  const cancelDelete = () => {
    setStoryToDelete(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Page Heading */}
      <div className="bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-5xl animate-bounce">📚</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              My Story Collection
            </h1>
            <span className="text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
          </div>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            All Your Amazing Adventures in One Place! 🎨
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 shadow-lg animate-bounce">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div className="flex-1">
                <p className="text-green-800 font-bold text-lg">{successMessage}</p>
              </div>
              <button
                onClick={() => setSuccessMessage('')}
                className="text-green-600 hover:text-green-800 font-bold text-2xl"
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {deleteError && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <p className="text-red-800 font-bold text-lg">{deleteError}</p>
              </div>
              <button
                onClick={() => setDeleteError('')}
                className="text-red-600 hover:text-red-800 font-bold text-2xl"
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
            <p className="text-xl text-gray-600">Loading your stories...</p>
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
              onClick={fetchStories}
              className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && stories.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Stories Yet!</h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
              Start your creative journey by creating your first amazing story!
            </p>
            <button
              onClick={() => router.push('/?create=true')}
              className="bg-linear-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              ➕ Create My First Story
            </button>
          </div>
        ) : !loading && !error && (
          /* Stories Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onPlay={handlePlayStory}
                onDelete={handleDeleteStory}
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

      {/* Delete Confirmation Modal */}
      {storyToDelete && (
        <DeleteConfirmModal
          isOpen={!!storyToDelete}
          storyTitle={storyToDelete.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
