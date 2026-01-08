import { Story, StoryInput, Scene } from '@/types/story';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a kid-friendly AI story based on input parameters
 * This is a mock implementation - replace with actual AI API calls
 */
export async function generateStory(input: StoryInput): Promise<Story> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const storyId = uuidv4();
  
  // Generate story title
  const title = generateTitle(input);
  
  // Generate scenes based on the story
  const scenes = generateScenes(input, storyId);

  const story: Story = {
    id: storyId,
    title,
    genre: input.genre,
    characters: input.characters,
    description: input.description,
    scenes,
    coverImage: scenes[0]?.imageUrl,
    createdAt: new Date().toISOString(),
  };

  return story;
}

function generateTitle(input: StoryInput): string {
  const genreText = input.genre[0] || 'Amazing';
  const mainChar = input.characters[0] || 'A Friend';
  
  const titles = [
    `${mainChar}'s ${genreText} Adventure`,
    `The ${genreText} Tale of ${mainChar}`,
    `${mainChar} and the Magical Journey`,
    `The Amazing Story of ${input.characters.join(' and ')}`,
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}

function generateScenes(input: StoryInput, storyId: string): Scene[] {
  const { characters, description } = input;
  const charList = characters.join(', ');
  
  // Mock scene generation - in production, use AI API
  const scenes: Scene[] = [
    {
      id: `${storyId}-scene-1`,
      text: `Once upon a time, ${characters[0]} lived in a wonderful place. ${characters[0]} loved to explore and discover new things every day. One morning, something magical was about to happen!`,
      imagePrompt: `A cheerful cartoon illustration of ${characters[0]}, a happy child character, in a bright colorful setting, children's book style, soft colors, friendly atmosphere`,
      imageUrl: `https://placehold.co/800x600/FFE5B4/333333?text=${encodeURIComponent(characters[0] + "'s Home")}`
    },
    {
      id: `${storyId}-scene-2`,
      text: `${characters.length > 1 ? characters.join(' and ') + ' met' : characters[0] + ' discovered'} something amazing! ${description}. They couldn't believe their eyes!`,
      imagePrompt: `Cartoon style illustration showing ${charList} discovering something magical and amazing, vibrant colors, child-friendly, storybook art style`,
      imageUrl: `https://placehold.co/800x600/B4D7FF/333333?text=${encodeURIComponent('The Discovery!')}`
    },
    {
      id: `${storyId}-scene-3`,
      text: `The adventure had just begun! ${characters[0]} ${characters.length > 1 ? 'and friends' : ''} decided to be brave and explore further. They knew that friendship and courage would guide them through any challenge.`,
      imagePrompt: `${charList} on an exciting adventure, cartoon style, bright happy colors, magical atmosphere, children's illustration`,
      imageUrl: `https://placehold.co/800x600/FFB4E5/333333?text=${encodeURIComponent('The Adventure')}`
    },
    {
      id: `${storyId}-scene-4`,
      text: `Together, they faced fun challenges and made wonderful discoveries. They learned that being kind and brave can make anything possible. What an incredible journey it was!`,
      imagePrompt: `${charList} working together happily, solving puzzles, cartoon illustration, warm colors, joyful scene, kid-friendly art`,
      imageUrl: `https://placehold.co/800x600/B4FFB4/333333?text=${encodeURIComponent('Working Together')}`
    },
    {
      id: `${storyId}-scene-5`,
      text: `As the sun began to set, ${characters[0]} ${characters.length > 1 ? 'and friends' : ''} realized they had the best day ever. They made memories that would last forever. The End... or is it just the beginning?`,
      imagePrompt: `${charList} at sunset, happy and tired after their adventure, warm golden colors, peaceful scene, children's book illustration style`,
      imageUrl: `https://placehold.co/800x600/FFD4B4/333333?text=${encodeURIComponent('Happy Ending')}`
    }
  ];

  return scenes;
}
