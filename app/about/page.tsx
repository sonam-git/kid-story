'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Sparkles, Book, Home, Moon, Star } from 'lucide-react';

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo/ks-transparent-logo.png" 
              alt="Story Magic" 
              width={40} 
              height={40}
              className="drop-shadow-md"
            />
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h1>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 md:px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Home</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <Image 
                src="/logo/ks-transparent-logo.png" 
                alt="Story Magic Logo" 
                width={100} 
                height={100}
                className="drop-shadow-lg"
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
              🌟 About ImagiKids🌟
            </h2>
          </div>

          {/* Story Section */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-500">
              <p className="font-semibold text-xl text-gray-800 mb-3">
                Every night before bedtime, my two kids love to hear stories.
              </p>
              <p className="mb-3">But not just any stories…</p>
              <p className="text-purple-900 font-medium">
                They want their own names, their favorite characters, and their own magical adventures to be part of the story 📖✨
              </p>
            </div>

            <p>
              And as any parent knows, coming up with a brand-new story every night isn&#39;t always easy!
            </p>

            <p className="font-semibold text-gray-800 text-xl">
              That&#39;s when this idea was born.
            </p>

            {/* AI Section */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">🧠✨ A Little Help from AI</h3>
              </div>
              
              <p>
                I created this simple, kid-friendly, AI-powered story generator to help bring their imaginations to life.
              </p>
              
              <p className="font-medium text-gray-800">
                Now, with just a few clicks, stories can include:
              </p>
              
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                  <span>Your child&#39;s name</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                  <span>Their favorite characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                  <span>Fun genres like adventure, fantasy, bedtime tales, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                  <span>Magical illustrations to go along with the story</span>
                </li>
              </ul>
              
              <p className="text-purple-900 font-medium pt-4 ">
                My kids absolutely love it — and bedtime has become easier, calmer, and even more magical 💤🌙
              </p>
            </div>

            {/* Made with Love Section */}
            <div className="bg-linear-to-r from-pink-50 to-purple-50 rounded-2xl p-4 space-y-4">
              <Heart className="w-8 h-8 text-pink-600" />
              <div className="flex items-center gap-1 mb-4">
                <h3 className="text-md font-bold text-center text-gray-800"> Made for Kids, ❤️ by Parents </h3>
              </div>
              <p className="text-center">This app was made with love for children and parents alike:</p>

              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Easy to use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Safe and kid-friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span>Encourages imagination, creativity, and reading</span>
                </li>
              </ul>
            </div>

            {/* Closing Message */}
            <div className="text-center py-6 space-y-4">
              <p className="text-xl text-gray-800 font-medium">
                I hope this app helps your family enjoy storytelling just as much as mine does — and makes bedtime stories something your kids look forward to every night.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                <Book className="w-8 h-8 text-purple-600" />
                <span>Happy storytelling! 🌈📚</span>
              </div>
              
              <p className="text-gray-600 italic pt-4">
                — Sonam J. Sherpa
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center space-y-4">
              <Moon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">
                Ready to create magical bedtime stories?
              </h3>
              <button
                onClick={() => router.push('/?create=true')}
                className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <Sparkles className="w-6 h-6" />
                Create Your Story Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
