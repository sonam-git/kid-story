'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import StoryModal from '@/components/StoryModal';
import { StoryInput } from '@/types/story';
import { storageService } from '@/services/storageService';
import { Sparkles } from 'lucide-react';

export default function CreateStory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const router = useRouter();

  const handleCreateStory = async (input: StoryInput) => {
    setIsGenerating(true);
    setGenerationProgress('Writing your story...');
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
        throw new Error(error.error || 'Failed to generate story');
      }

      setGenerationProgress('Generating images... This may take a moment!');
      const story = await response.json();
      
      setGenerationProgress('Almost done!');
      
      // Save to local storage
      storageService.saveStory(story);
      
      // Close modal and navigate to My Stories
      setIsModalOpen(false);
      setGenerationProgress('');
      router.push('/my-stories');
    } catch (error) {
      console.error('Error creating story:', error);
      const errorMessage = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.';
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
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
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            ✨ Story Magic ✨
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
            Create Amazing Stories with AI!
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your characters and ideas, and watch as AI brings your imagination to life with beautiful stories and pictures!
          </p>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-2xl font-bold hover:shadow-2xl transition-all hover:scale-110 flex items-center gap-3 mx-auto"
        >
          <Sparkles className="w-8 h-8" />
          Create Your Story
        </button>

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

        {/* Navigation */}
        <div className="pt-8">
          <button
            onClick={() => router.push('/my-stories')}
            className="text-purple-600 hover:text-purple-800 font-semibold text-lg underline"
          >
            View My Stories →
          </button>
        </div>
      </div>

      {/* Story Modal */}
      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStory}
        isGenerating={isGenerating}
        generationProgress={generationProgress}
      />
    </div>
  );
}
