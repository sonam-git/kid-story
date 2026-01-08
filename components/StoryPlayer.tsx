'use client';

import { useState, useEffect } from 'react';
import { Story } from '@/types/story';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ttsService from '@/services/ttsService';

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentScene = story.scenes[currentSceneIndex];
  const isFirstScene = currentSceneIndex === 0;
  const isLastScene = currentSceneIndex === story.scenes.length - 1;

  // Generate a contextual scene title based on the scene content
  const getSceneTitle = (index: number, scene: typeof currentScene): string => {
    // Extract a kid-friendly title from the scene text
    const text = scene.text.toLowerCase();
    
    // Try to find key phrases or actions in the scene
    if (index === 0) {
      // First scene - look for character introduction
      const characters = story.characters.join(', ');
      return `🌟 Meet ${characters}`;
    } else if (index === story.scenes.length - 1) {
      // Last scene - always the ending
      if (text.includes('happy') || text.includes('joy') || text.includes('smiled')) {
        return '🎉 A Happy Ending';
      } else if (text.includes('learned') || text.includes('understand')) {
        return '💡 Lessons Learned';
      }
      return '🎊 The End';
    } else {
      // Middle scenes - detect action or emotion
      if (text.includes('adventure') || text.includes('journey') || text.includes('went')) {
        return '🚀 The Adventure';
      } else if (text.includes('discover') || text.includes('found') || text.includes('saw')) {
        return '🔍 A Discovery';
      } else if (text.includes('problem') || text.includes('challenge') || text.includes('difficult')) {
        return '🎭 A Challenge';
      } else if (text.includes('friend') || text.includes('met') || text.includes('together')) {
        return '🤝 Making Friends';
      } else if (text.includes('magic') || text.includes('special') || text.includes('amazing')) {
        return '✨ Something Magical';
      } else if (text.includes('help') || text.includes('try') || text.includes('brave')) {
        return '💪 Being Brave';
      } else if (text.includes('learn') || text.includes('teach') || text.includes('know')) {
        return '📚 Learning Time';
      } else if (text.includes('home') || text.includes('back') || text.includes('return')) {
        return '🏠 Going Home';
      } else {
        return `✨ Part ${index + 1}`;
      }
    }
  };

  const currentSceneTitle = getSceneTitle(currentSceneIndex, currentScene);

  useEffect(() => {
    // Cleanup speech on unmount
    return () => {
      ttsService.stop();
    };
  }, []);

  // Reset playing state when scene changes
  useEffect(() => {
    ttsService.stop();
    // Reset state on next tick to avoid cascading renders
    const timer = setTimeout(() => {
      setIsPlaying(false);
      setIsPaused(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [currentSceneIndex]);

  const handlePlayPause = () => {
    if (isPlaying && !isPaused) {
      ttsService.pause();
      setIsPaused(true);
    } else if (isPaused) {
      ttsService.resume();
      setIsPaused(false);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      ttsService.speak(currentScene.text, {
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          // Auto-advance to next scene
          if (!isLastScene) {
            setTimeout(() => {
              setCurrentSceneIndex(prev => prev + 1);
            }, 1000);
          }
        },
      });
    }
  };

  const handleNext = () => {
    if (!isLastScene) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstScene) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const handleClose = () => {
    ttsService.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-black bg-opacity-30 backdrop-blur-sm p-3 md:p-4 flex justify-between items-center flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white truncate">{story.title}</h1>
          <p className="text-purple-200 text-xs md:text-sm flex items-center gap-2">
            <span className="font-semibold">{currentSceneTitle}</span>
            <span className="text-purple-300">•</span>
            <span>{currentSceneIndex + 1} of {story.scenes.length}</span>
          </p>
        </div>
        <button
          onClick={handleClose}
          className="bg-pink-500 hover:bg-pink-600 rounded-full p-2 md:p-3 transition-all shadow-lg hover:shadow-xl hover:scale-110 ml-2 flex-shrink-0"
          aria-label="Close story"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="flex-1 flex items-center justify-center p-3 md:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-stretch gap-4 md:gap-6 lg:gap-8">
          
          {/* Image - Left Side */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] lg:min-h-0">
            <div className="relative w-full h-full max-h-[400px] lg:max-h-none rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              {currentScene.imageUrl ? (
                <Image
                  src={currentScene.imageUrl}
                  alt={`Scene ${currentSceneIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-pink-300 flex items-center justify-center text-6xl md:text-8xl">
                  📖
                </div>
              )}
            </div>
            {/* Scene Caption */}
            <div className="mt-3 md:mt-4 text-center">
              <p className="text-white text-sm md:text-base lg:text-lg font-semibold drop-shadow-lg">
                {currentSceneTitle}
              </p>
            </div>
          </div>

          {/* Text - Right Side */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white bg-opacity-95 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10 w-full h-full flex items-center justify-center shadow-2xl">
              <p className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-800 leading-relaxed text-center font-medium">
                {currentScene.text}
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Controls - Fixed at bottom with larger, more visible arrows */}
      <div className="bg-black bg-opacity-40 backdrop-blur-sm p-4 md:p-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          
          {/* Previous Button - Larger and more visible */}
          <button
            onClick={handlePrevious}
            disabled={isFirstScene}
            className={`p-4 md:p-5 lg:p-6 rounded-full transition-all shadow-lg ${
              isFirstScene
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-40'
                : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-110 hover:shadow-2xl'
            }`}
            aria-label="Previous scene"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" strokeWidth={3} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 md:p-6 lg:p-8 rounded-full hover:shadow-2xl transition-all hover:scale-110 shadow-xl"
            aria-label={isPlaying && !isPaused ? "Pause narration" : "Play narration"}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" fill="white" />
            ) : (
              <Play className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" fill="white" />
            )}
          </button>

          {/* Next Button - Larger and more visible */}
          <button
            onClick={handleNext}
            disabled={isLastScene}
            className={`p-4 md:p-5 lg:p-6 rounded-full transition-all shadow-lg ${
              isLastScene
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-40'
                : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-110 hover:shadow-2xl'
            }`}
            aria-label="Next scene"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" strokeWidth={3} />
          </button>
          
        </div>
        
        {/* Progress Indicator - More visible */}
        <div className="max-w-7xl mx-auto mt-4 flex gap-3 justify-center">
          {story.scenes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSceneIndex(index)}
              className={`h-3 rounded-full transition-all hover:scale-110 ${
                index === currentSceneIndex
                  ? 'bg-white w-12 shadow-lg'
                  : 'bg-white bg-opacity-40 w-3 hover:bg-opacity-60'
              }`}
              aria-label={`Go to scene ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
