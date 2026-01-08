'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StoryInput, GENRE_OPTIONS } from '@/types/story';
import { X } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: StoryInput) => void;
  isGenerating: boolean;
  generationProgress?: string;
}

export default function StoryModal({ isOpen, onClose, onSubmit, isGenerating, generationProgress }: StoryModalProps) {
  const [characters, setCharacters] = useState<string[]>(['']);
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleAddCharacter = () => {
    setCharacters([...characters, '']);
  };

  const handleRemoveCharacter = (index: number) => {
    if (characters.length > 1) {
      setCharacters(characters.filter((_, i) => i !== index));
    }
  };

  const handleCharacterChange = (index: number, value: string) => {
    const updated = [...characters];
    updated[index] = value;
    setCharacters(updated);
  };

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const isValid = () => {
    const hasCharacters = characters.some(c => c.trim().length > 0);
    const hasDescription = description.trim().length > 0;
    const hasGenre = selectedGenres.length > 0;
    return hasCharacters && hasDescription && hasGenre;
  };

  const handleSubmit = () => {
    if (!isValid()) return;

    const input: StoryInput = {
      characters: characters.filter(c => c.trim().length > 0),
      description: description.trim(),
      genre: selectedGenres,
    };

    onSubmit(input);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-3xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo/ks-transparent-logo.png" 
              alt="Story Magic" 
              width={40} 
              height={40}
              className="drop-shadow-md"
            />
            <h2 className="text-3xl font-bold">✨ Create Your Story!</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-red-800 rounded-full p-2 transition-all shadow-lg hover:shadow-xl hover:scale-110"
            disabled={isGenerating}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Characters Section */}
          <div>
            <label className="block text-2xl font-bold text-gray-800 mb-3">
              🎭 Who are the heroes?
            </label>
            <div className="space-y-3">
              {characters.map((character, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={character}
                    onChange={(e) => handleCharacterChange(index, e.target.value)}
                    placeholder={`Character ${index + 1} name...`}
                    className="flex-1 px-4 py-3 border-3 border-purple-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500"
                    disabled={isGenerating}
                  />
                  {characters.length > 1 && (
                    <button
                      onClick={() => handleRemoveCharacter(index)}
                      className="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 transition-all font-bold"
                      disabled={isGenerating}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddCharacter}
                className="w-full bg-purple-100 text-purple-700 px-4 py-3 rounded-xl hover:bg-purple-200 transition-all font-bold text-lg"
                disabled={isGenerating}
              >
                + Add Another Character
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-2xl font-bold text-gray-800 mb-3">
              📖 What is your story about?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brave kid and a magical dragon go on an adventure..."
              rows={4}
              className="w-full px-4 py-3 border-3 border-blue-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 resize-none"
              disabled={isGenerating}
            />
          </div>

          {/* Genre Section */}
          <div>
            <label className="block text-2xl font-bold text-gray-800 mb-3">
              🎨 Pick your story style:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GENRE_OPTIONS.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-3 rounded-xl font-bold text-lg transition-all ${
                    selectedGenres.includes(genre)
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled={isGenerating}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid() || isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
              isValid() && !isGenerating
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <span className="flex flex-col items-center justify-center gap-2">
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Creating Your Amazing Story...
                </span>
                {generationProgress && (
                  <span className="text-sm font-normal opacity-90">
                    {generationProgress}
                  </span>
                )}
              </span>
            ) : (
              '🚀 Create Story!'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
