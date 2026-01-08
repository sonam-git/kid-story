/**
 * Text-to-Speech service for story narration
 * Uses the Web Speech API (available in most modern browsers)
 */

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      
      // Load voices
      this.loadVoices();
      
      // Voices load asynchronously on some browsers
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      const voices = this.synth.getVoices();
      this.voicesLoaded = voices.length > 0;
    }
  }

  /**
   * Speak the given text
   */
  speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
  }): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser');
      if (options?.onEnd) options.onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    // Function to actually speak with voices loaded
    const speakWithVoice = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Kid-friendly voice settings
      utterance.rate = options?.rate || 0.9; // Slightly slower for kids
      utterance.pitch = options?.pitch || 1.1; // Slightly higher pitch
      utterance.volume = options?.volume || 1;

      // Try to use a kid-friendly voice
      const voices = this.synth!.getVoices();
      
      if (voices.length > 0) {
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Karen') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Google') ||
          voice.lang.startsWith('en')
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        } else {
          // Use first available English voice
          const englishVoice = voices.find(v => v.lang.startsWith('en'));
          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
      }

      if (options?.onEnd) {
        utterance.onend = options.onEnd;
      }

      this.currentUtterance = utterance;
      this.synth!.speak(utterance);
    };

    // If voices aren't loaded yet, wait a bit and try again
    if (!this.voicesLoaded) {
      setTimeout(() => {
        this.loadVoices();
        speakWithVoice();
      }, 100);
    } else {
      speakWithVoice();
    }
  }

  /**
   * Pause the current speech
   */
  pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Stop and cancel current speech
   */
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }

  /**
   * Check if speech is paused
   */
  isPaused(): boolean {
    return this.synth?.paused || false;
  }

  /**
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth?.getVoices() || [];
  }
}

// Create singleton instance
const ttsService = new TTSService();

export default ttsService;

// Export convenience functions
export const speak = (text: string, options?: Parameters<typeof ttsService.speak>[1]) => 
  ttsService.speak(text, options);

export const pause = () => ttsService.pause();
export const resume = () => ttsService.resume();
export const stop = () => ttsService.stop();
export const isSpeaking = () => ttsService.isSpeaking();
export const isPaused = () => ttsService.isPaused();
