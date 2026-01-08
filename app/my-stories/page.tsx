'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StoryCard from '@/components/StoryCard';
import StoryPlayer from '@/components/StoryPlayer';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { Story } from '@/types/story';
import { storageService } from '@/services/storageService';
import { BookOpen, Plus, Home } from 'lucide-react';

export default function MyStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load stories from local storage
    const loadedStories = storageService.getStories();
    Promise.resolve().then(() => setStories(loadedStories));
  }, []);

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

  const confirmDelete = () => {
    if (storyToDelete) {
      storageService.deleteStory(storyToDelete.id);
      setStories(stories.filter(s => s.id !== storyToDelete.id));
      setStoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setStoryToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Stories</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => router.push('/?create=true')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 md:px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">New Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {stories.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Stories Yet!</h2>
            <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
              Start your creative journey by creating your first amazing story!
            </p>
            <button
              onClick={() => router.push('/?create=true')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-6 h-6" />
              Create My First Story
            </button>
          </div>
        ) : (
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
