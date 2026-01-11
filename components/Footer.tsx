'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, BookOpen, Sparkles, Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo/ks-transparent-logo.png" 
                alt="ImagiKids" 
                width={50} 
                height={50}
                className="drop-shadow-md"
              />
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                ImagiKids
              </h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Create magical stories with AI! Empower young minds to explore creativity, 
              imagination, and storytelling through AI-powered adventures.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/sonam-j-sherpa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
              </a>
              <a
                href="https://github.com/sonam-git"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="mailto:sherpa.sjs@gmail.com"
                className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-purple-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/my-stories" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  My Stories
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:sherpa.sjs@gmail.com"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          {/* Copyright & Credits */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} ImagiKids. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500 fill-current" /> for young creators.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Powered by AI • Built for Kids • Inspiring Creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
