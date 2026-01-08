# 🤖 AI Integration Guide

This guide explains how to integrate real AI services into Story Magic.

## Current State

The app currently uses **mock implementations** that work without any API keys:
- ✅ Story generation uses templates
- ✅ Images use placeholders from placehold.co
- ✅ Everything works offline after initial load

## Integrating Real AI Services

### Option 1: OpenAI (GPT-4 + DALL-E)

#### Setup

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Install the SDK:
   ```bash
   npm install openai
   ```
3. Create `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

#### Story Generation

Update `services/aiStoryService.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStory(input: StoryInput): Promise<Story> {
  const prompt = `
    Create a kid-friendly story (ages 5-10) with these details:
    - Characters: ${input.characters.join(', ')}
    - Description: ${input.description}
    - Genres: ${input.genre.join(', ')}
    
    Format as JSON with:
    - title (string)
    - scenes (array of 5 scenes)
    - Each scene has: text (2-3 sentences) and imagePrompt (description for illustration)
    
    Keep it positive, safe, and age-appropriate!
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a creative children's storyteller who writes safe, engaging stories for kids aged 5-10."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(completion.choices[0].message.content!);
  
  return {
    id: uuidv4(),
    title: result.title,
    genre: input.genre,
    characters: input.characters,
    description: input.description,
    scenes: result.scenes.map((scene: any, index: number) => ({
      id: `${uuidv4()}-scene-${index}`,
      text: scene.text,
      imagePrompt: scene.imagePrompt,
      imageUrl: undefined // Will be generated next
    })),
    createdAt: new Date().toISOString(),
  };
}
```

#### Image Generation

Update `services/imageService.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Children's storybook illustration, soft colors, friendly style, cartoon art: ${prompt}`,
    size: "1024x1024",
    quality: "standard",
    style: "vivid",
  });
  
  return response.data[0].url!;
}
```

### Option 2: Anthropic Claude + Stability AI

#### Setup

```bash
npm install @anthropic-ai/sdk
npm install stability-sdk
```

`.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-...
STABILITY_API_KEY=sk-...
```

#### Story Generation with Claude

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateStory(input: StoryInput): Promise<Story> {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Create a kid-friendly story...`
      }
    ],
  });
  
  // Parse response and format
  // ...
}
```

#### Image Generation with Stability AI

```typescript
import { StabilityAI } from 'stability-sdk';

const stability = new StabilityAI({
  apiKey: process.env.STABILITY_API_KEY,
});

export async function generateImage(prompt: string): Promise<string> {
  const result = await stability.generateImage({
    prompt: `children's book illustration: ${prompt}`,
    style_preset: "comic-book",
  });
  
  return result.url;
}
```

### Option 3: Hugging Face (Free Tier Available)

```bash
npm install @huggingface/inference
```

```typescript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function generateImage(prompt: string): Promise<string> {
  const blob = await hf.textToImage({
    model: 'stabilityai/stable-diffusion-xl-base-1.0',
    inputs: `children's book illustration, cartoon style: ${prompt}`,
  });
  
  // Convert blob to URL
  return URL.createObjectURL(blob);
}
```

## Making API Calls Server-Side

For better security, move AI calls to API routes:

### Create API Route

`app/api/generate-story/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { generateStory } from '@/services/aiStoryService';

export async function POST(request: Request) {
  try {
    const input = await request.json();
    const story = await generateStory(input);
    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}
```

### Update Client

`app/create-story/page.tsx`:

```typescript
const handleCreateStory = async (input: StoryInput) => {
  setIsGenerating(true);
  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    const story = await response.json();
    storageService.saveStory(story);
    router.push('/my-stories');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsGenerating(false);
  }
};
```

## Cost Considerations

### OpenAI Pricing (as of 2024)
- **GPT-4**: ~$0.03 per story
- **DALL-E 3**: ~$0.04 per image
- **Total per story**: ~$0.23 (1 story + 5 images)

### Tips to Reduce Costs
1. Use GPT-3.5-turbo instead of GPT-4
2. Cache generated images
3. Implement rate limiting
4. Use lower resolution images initially
5. Add user quotas

### Free Alternatives
- **Hugging Face**: Free tier available
- **Together AI**: Generous free credits
- **Replicate**: Pay per use, no subscription

## Safety & Content Filtering

### Add Content Moderation

```typescript
// Check if content is appropriate
const moderation = await openai.moderations.create({
  input: storyText,
});

if (moderation.results[0].flagged) {
  throw new Error('Content flagged as inappropriate');
}
```

### Kid-Safe Prompts

Always include in your prompts:
- "appropriate for ages 5-10"
- "no violence, scary content, or inappropriate themes"
- "positive and educational"
- "family-friendly"

## Testing AI Integration

1. Start with a few test stories
2. Review generated content manually
3. Check image appropriateness
4. Test error handling
5. Monitor API costs
6. Set up alerts for high usage

## Rate Limiting

Add to protect your API keys:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 stories per 15 minutes
});

export default limiter;
```

---

**Remember**: The current mock implementation is perfect for development and testing. Only integrate real AI when you're ready to handle API costs and moderation! 🚀
