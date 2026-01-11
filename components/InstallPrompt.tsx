'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed - if so, don't show prompt
    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if prompt was previously dismissed
    const promptDismissed = localStorage.getItem('install-prompt-dismissed');
    if (promptDismissed === 'true') {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay (3 seconds)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect if app was installed
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✨ User installed ImagiKids!');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  // Don't show if prompt not available
  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
            <Download className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              📱 Install ImagiKids!
            </h3>
            <p className="text-sm text-white/90 mb-3">
              Add to your home screen for quick access and use it like a real app!
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Install Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-white/90 hover:text-white font-medium transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
