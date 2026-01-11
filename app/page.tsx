'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import StoryModal from '@/components/StoryModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StoryInput } from '@/types/story';
import { apiStorageService } from '@/services/apiStorageService';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Open modal if URL has ?create=true
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    router.push('/?create=true', { scroll: false });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/', { scroll: false });
  };

  const handleCreateStory = async (input: StoryInput) => {
    setIsGenerating(true);
    try {
      // Call API to generate the story with real AI
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        
        // Handle rate limit errors specifically
        if (response.status === 429) {
          alert('⏰ Whoa! Slow down there, speedy! The AI needs a little break. Please wait 1 minute and try again! 🌟');
          return;
        }
        
        throw new Error(error.error || 'Failed to generate story');
      }

      const story = await response.json();
      
      // Save to MongoDB via API
      await apiStorageService.saveStory(story);
      
      // Close modal and navigate to My Stories
      setIsModalOpen(false);
      router.push('/my-stories');
    } catch (error) {
      console.error('Error creating story:', error);
      const errorMessage = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header - Only show when logged in */}
      {user && <Header />}

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4" style={{ minHeight: user ? 'calc(100vh - 96px)' : '100vh' }}>
        <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo/ks-transparent-logo.png" 
              alt="Story Magic Logo" 
              width={120} 
              height={120}
              className="drop-shadow-lg"
              priority
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-4">
            ✨ ImagiKids✨
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
            Create Amazing Stories with AI!
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your characters and ideas, and watch as AI brings your imagination to life with beautiful stories and pictures!
          </p>
        </div>

        {/* Main CTA Button - Only show when logged in */}
        {user && (
          <button
            onClick={handleOpenModal}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-2xl font-bold hover:shadow-2xl transition-all hover:scale-110 flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-8 h-8" />
            Create Your Story
          </button>
        )}

        {/* CTA for non-logged in users */}
        {!user && (
          <div className="space-y-4">
            <p className="text-xl text-gray-700 font-semibold">
              Sign up to start creating magical stories! ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3 justify-center"
              >
                <UserPlus className="w-6 h-6" />
                Sign Up Free
              </Link>
              <Link
                href="/login"
                className="bg-white text-purple-600 border-2 border-purple-500 px-10 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 justify-center"
              >
                <LogIn className="w-6 h-6" />
                Login
              </Link>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-3">🎭</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Characters</h3>
            <p className="text-gray-600">Create heroes and friends for your story</p>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-3">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Beautiful Pictures</h3>
            <p className="text-gray-600">AI draws amazing scenes for your tale</p>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-3">🎧</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Story Time</h3>
            <p className="text-gray-600">Listen as your story comes alive</p>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Story Modal */}
      <StoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateStory}
        isGenerating={isGenerating}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">✨ Story Magic ✨</h1>
          <p className="text-gray-600">Loading your magical story adventure...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
