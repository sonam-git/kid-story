import { Story } from '@/types/story';

const STORAGE_KEY = 'kid-stories';

/**
 * Local storage service for persisting stories
 */
export const storageService = {
  /**
   * Get all saved stories
   */
  getStories(): Story[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const stories = stored ? JSON.parse(stored) : [];
      
      // Clean up corrupted data
      return stories.map((story: any) => this.cleanStory(story));
    } catch (error) {
      console.error('Error reading stories from storage:', error);
      return [];
    }
  },

  /**
   * Get a single story by ID
   */
  getStory(id: string): Story | null {
    const stories = this.getStories();
    return stories.find(story => story.id === id) || null;
  },

  /**
   * Save a new story
   */
  saveStory(story: Story): void {
    try {
      const stories = this.getStories();
      stories.push(story);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (error) {
      console.error('Error saving story to storage:', error);
      throw new Error('Failed to save story');
    }
  },

  /**
   * Update an existing story
   */
  updateStory(updatedStory: Story): void {
    try {
      const stories = this.getStories();
      const index = stories.findIndex(s => s.id === updatedStory.id);
      
      if (index !== -1) {
        stories[index] = updatedStory;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
      }
    } catch (error) {
      console.error('Error updating story in storage:', error);
      throw new Error('Failed to update story');
    }
  },

  /**
   * Delete a story
   */
  deleteStory(id: string): void {
    try {
      const stories = this.getStories();
      const filtered = stories.filter(story => story.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting story from storage:', error);
      throw new Error('Failed to delete story');
    }
  },

  /**
   * Clear all stories
   */
  clearAllStories(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing stories from storage:', error);
      throw new Error('Failed to clear stories');
    }
  },

  /**
   * Clean up corrupted story data
   */
  cleanStory(story: any): Story {
    // Fix coverImage if it's an object or invalid (but keep valid URLs!)
    if (!story.coverImage || typeof story.coverImage !== 'string' || story.coverImage.trim() === '') {
      story.coverImage = 'https://placehold.co/1024x768/9333EA/FFFFFF/png?text=📚+Story';
    }
    
    // Fix scenes with invalid imageUrls (but keep valid URLs!)
    if (story.scenes && Array.isArray(story.scenes)) {
      story.scenes = story.scenes.map((scene: any, index: number) => {
        if (!scene.imageUrl || typeof scene.imageUrl !== 'string' || scene.imageUrl.trim() === '') {
          scene.imageUrl = `https://placehold.co/1024x768/9333EA/FFFFFF/png?text=🌟+Scene+${index + 1}`;
        }
        return scene;
      });
    }
    
    return story as Story;
  },
};
