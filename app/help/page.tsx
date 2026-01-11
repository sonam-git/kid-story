'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  HelpCircle, 
  ArrowLeft, 
  BookOpen, 
  Shield, 
  Sparkles, 
  Heart,
  Mail,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function HelpCenterPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is ImagiKids safe for kids?",
      answer: "Yes! ImagiKids is designed for children ages 3–8 and must be used by parents or guardians. No ads, no chat, no social sharing."
    },
    {
      question: "Do I need an account?",
      answer: "Yes. An account is required to create and save stories and images."
    },
    {
      question: "Can I include my child's name?",
      answer: "Yes! First names or nicknames are okay. Please avoid full names or personal details."
    },
    {
      question: "Are stories saved?",
      answer: "Yes. Stories and images are saved in your account and can be deleted permanently at any time."
    },
    {
      question: "Who owns the stories?",
      answer: "You do! All stories and images you create belong to you."
    },
    {
      question: "Why do images sometimes take time?",
      answer: "AI image generation requires processing time. Images may take a few moments to create."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes. Contact us and we'll permanently delete your account and data."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header - Only show if logged in */}
      {user && <Header />}

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
              👋 Welcome to ImagiKids Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ImagiKids helps parents create personalized, magical bedtime stories for their children using AI.
              If you need help, you&apos;re in the right place 💛
            </p>
          </div>

          {/* Quick Start */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">🚀 Quick Start</h2>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 space-y-4">
              <ol className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span>Sign in or create an account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span>Tap <strong>Create Story</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span>Enter character names and a short story idea</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span>Choose a genre</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  <span>Enjoy your child&apos;s personalized story 🌙📖</span>
                </li>
              </ol>
              <p className="text-gray-700 text-center mt-4 font-medium">
                Stories and images are saved automatically to your account.
              </p>
            </div>
          </section>

          {/* Stories & Images */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-800">📖 Stories & Images</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 rounded-2xl p-6">
                <ImageIcon className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">How It Works</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✨ Stories are created using AI based on your prompt</li>
                  <li>🎨 Images may take a moment to generate</li>
                  <li>💾 All stories and images are automatically saved</li>
                  <li>🗑️ Can be deleted anytime from My Stories</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6">
                <AlertCircle className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">Important</h3>
                <p className="text-gray-700 text-lg">
                  ⚠️ <strong>Please review stories before sharing with children.</strong> AI-generated content should always be checked by parents first.
                </p>
              </div>
            </div>
          </section>

          {/* Safety First */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">🛡️ Safety First</h2>
            </div>
            <div className="bg-green-50 rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">What We Have</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      No advertisements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      No chat between users
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      No public profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Parent-controlled accounts only
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-red-600 mb-2">⚠️ Safety Reminder</h3>
                  <p className="text-gray-700">
                    Please do not enter real personal information such as full names, addresses, school names, or contact details. 
                    ImagiKids is designed for imagination, not real-world data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">🔍 Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                    <span className="text-2xl text-purple-600">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 bg-purple-50 border-t-2 border-gray-200">
                      <p className="text-gray-700 text-lg">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Parent Guide */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-800">👨‍👩‍👧 A Guide for Parents</h2>
            </div>
            <div className="bg-linear-to-br from-red-50 to-pink-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6">
                ImagiKids was created by a parent to make bedtime storytelling easier and more magical.
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-4">To get the best experience:</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Keep stories age-appropriate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Review stories before reading them aloud</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Avoid sharing real personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Use ImagiKids together with your child</span>
                </li>
              </ul>
              <p className="text-xl text-center mt-6 font-semibold text-purple-700">
                Bedtime should feel calm, safe, and fun 🌙💛
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">📩 Need More Help?</h2>
            </div>
            <div className="bg-purple-100 rounded-2xl p-8 text-center">
              <p className="text-xl text-gray-700 mb-4">
                We&apos;re here to help! Email us anytime:
              </p>
              <a
                href="mailto:sherpa.sjs@gmail.com"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-purple-700 transition-all hover:scale-105"
              >
                <Mail className="w-6 h-6" />
                sherpa.sjs@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
