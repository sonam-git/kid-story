import { Story } from '@/types/story';

/**
 * API-backed storage service for persisting stories to MongoDB
 */
export const apiStorageService = {
  /**
   * Get all saved stories for the authenticated user
   */
  async getStories(): Promise<Story[]> {
    try {
      const response = await fetch('/api/stories', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        throw new Error('Failed to fetch stories');
      }

      const data = await response.json();
      return data.stories || [];
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  },

  /**
   * Get a single story by ID
   */
  async getStory(id: string): Promise<Story | null> {
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch story');
      }

      const data = await response.json();
      return data.story;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
  },

  /**
   * Save a new story
   */
  async saveStory(story: Story): Promise<Story> {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(story),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        throw new Error(data.error || 'Failed to save story');
      }

      const data = await response.json();
      return data.story;
    } catch (error) {
      console.error('Error saving story:', error);
      throw error;
    }
  },

  /**
   * Update an existing story
   */
  async updateStory(story: Story): Promise<Story> {
    try {
      const response = await fetch(`/api/stories/${story.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(story),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        throw new Error(data.error || 'Failed to update story');
      }

      const data = await response.json();
      return data.story;
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  },

  /**
   * Delete a story
   */
  async deleteStory(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete story');
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  },

  /**
   * Toggle like on a story
   */
  async toggleLike(storyId: string): Promise<{ liked: boolean; likesCount: number }> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      
      const response = await fetch(`/api/stories/${storyId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated. Please log in again.');
        }
        const data = await response.json();
        throw new Error(data.error || 'Failed to toggle like');
      }

      const data = await response.json();
      return {
        liked: data.liked,
        likesCount: data.likesCount,
      };
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  /**
   * Get all public stories
   */
  async getAllStories(): Promise<Story[]> {
    try {
      const response = await fetch('/api/stories/public', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch public stories');
      }

      const data = await response.json();
      return data.stories || [];
    } catch (error) {
      console.error('Error fetching public stories:', error);
      throw error;
    }
  },
};

// Keep the old localStorage service for backward compatibility
// (can be used as fallback or for offline mode)
export { storageService as localStorageService } from './storageService';
