import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { StoryInput, Story, Scene } from '@/types/story';

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = 'https://router.huggingface.co/v1';

export async function POST(request: Request) {
  try {
    const input: StoryInput = await request.json();

    // Validate input
    if (!input.characters || input.characters.length === 0) {
      return NextResponse.json(
        { error: 'At least one character is required' },
        { status: 400 }
      );
    }

    if (!input.description || input.description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Story description is required' },
        { status: 400 }
      );
    }

    if (!input.genre || input.genre.length === 0) {
      return NextResponse.json(
        { error: 'At least one genre is required' },
        { status: 400 }
      );
    }

    console.log('Generating story with Hugging Face (Qwen 2.5 72B)...');

    // Create the prompt for text generation
    const storyPrompt = `Create a kid-friendly story (ages 5-10) with these details:
- Characters: ${input.characters.join(', ')}
- Description: ${input.description}
- Genres: ${input.genre.join(', ')}

Format your response as JSON with this exact structure:
{
  "title": "Story Title Here",
  "scenes": [
    {
      "text": "Scene text here (2-3 sentences, engaging and age-appropriate)",
      "imagePrompt": "Detailed description for realistic illustration (high-quality, detailed, kid-friendly)"
    }
  ]
}

Create exactly 5 scenes that tell a complete story with:
- A beginning that introduces the characters and setting
- An exciting middle with adventure or discovery
- A happy, positive ending
- Each scene should be 2-3 sentences
- Each imagePrompt should be detailed and describe a realistic, high-quality illustration

Keep it:
- Appropriate for ages 5-10
- No violence, scary content, or inappropriate themes
- Positive and encouraging
- Educational when possible
- Fun and engaging

IMPORTANT: Return ONLY valid JSON, no other text.`;

    // Call Hugging Face API directly with new endpoint
    const textResponse = await fetch(`${HF_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-72B-Instruct',
        messages: [
          {
            role: 'system',
            content: "You are a creative children's storyteller who writes safe, engaging stories for kids aged 5-10. You always respond with valid JSON only."
          },
          {
            role: 'user',
            content: storyPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.8,
        top_p: 0.9,
      }),
    });

    if (!textResponse.ok) {
      const errorData = await textResponse.text();
      console.error('Hugging Face API error:', textResponse.status, errorData);
      throw new Error(`Hugging Face API error: ${textResponse.statusText}`);
    }

    const textData = await textResponse.json();
    const generatedText = textData.choices[0]?.message?.content || '{}';

    // Extract JSON from response (remove any extra text)
    let jsonText = generatedText.trim();
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    const result = JSON.parse(jsonText);
    console.log('Story generated successfully with Hugging Face!');

    // Generate images for each scene using Stable Diffusion
    console.log('Generating AI images with Stable Diffusion...');
    const imageUrls = await Promise.all(
      result.scenes.map(async (scene: any, index: number) => {
        try {
          console.log(`Generating image ${index + 1}/5...`);
          // Enhanced prompt for realistic, high-quality illustration
          const enhancedPrompt = `${scene.imagePrompt}, 
            realistic illustration, high quality digital art, detailed and beautiful,
            vibrant colors, professional illustration, cinematic lighting,
            kid-friendly scene, whimsical atmosphere, storybook quality,
            clear composition, friendly characters, cheerful mood,
            detailed background, fantasy realism style, painted illustration,
            warm and inviting, magical realism, enchanting scene`;
          
          const imageResponse = await fetch('https://router.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HF_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: enhancedPrompt,
              parameters: {
                negative_prompt: `scary, frightening, horror, violent, dark, gloomy, disturbing, 
                  inappropriate, adult content, weapons, blood, gore, monsters, 
                  nightmares, angry faces, sad themes, ugly, deformed, 
                  low quality, blurry, sketch, cartoon, anime, simple drawing`,
                guidance_scale: 3.5,
                num_inference_steps: 4,
                width: 1024,
                height: 768,
              },
            }),
          });

          if (!imageResponse.ok) {
            const errorText = await imageResponse.text();
            console.error(`Image generation failed for scene ${index + 1}:`, imageResponse.status, errorText);
            return generatePlaceholderImage(scene.imagePrompt, index);
          }

          // Convert response to base64
          const imageBuffer = await imageResponse.arrayBuffer();
          const base64 = Buffer.from(imageBuffer).toString('base64');
          console.log(`✓ Image ${index + 1}/5 generated successfully`);
          return `data:image/jpeg;base64,${base64}`;
        } catch (imgError) {
          console.error(`Error generating image ${index + 1}:`, imgError);
          // Fallback to placeholder if image generation fails
          return generatePlaceholderImage(scene.imagePrompt, index);
        }
      })
    );
    console.log('All images generated successfully!');

    // Build the final story object
    const storyId = uuidv4();
    const story: Story = {
      id: storyId,
      title: result.title,
      genre: input.genre,
      characters: input.characters,
      description: input.description,
      scenes: result.scenes.map((scene: any, index: number): Scene => ({
        id: `${storyId}-scene-${index}`,
        text: scene.text,
        imagePrompt: scene.imagePrompt,
        imageUrl: imageUrls[index],
      })),
      coverImage: imageUrls[0], // Use first scene as cover
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(story);

  } catch (error: any) {
    console.error('Error generating story:', error);
    
    // Handle specific Hugging Face errors
    if (error?.status === 401 || error?.message?.includes('Invalid API key')) {
      return NextResponse.json(
        { error: 'Invalid Hugging Face API key. Please check your .env.local file.' },
        { status: 500 }
      );
    }
    
    if (error?.status === 429 || error?.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment and try again!' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate story. Please try again.' },
      { status: 500 }
    );
  }
}

// Helper function to generate colorful placeholder images
function generatePlaceholderImage(prompt: string, index: number): string {
  // Array of beautiful, kid-friendly gradient colors
  const colors = [
    { bg: 'FFE5B4', text: '333333' }, // Peach
    { bg: 'B4D7FF', text: '333333' }, // Light blue
    { bg: 'FFB4E5', text: '333333' }, // Pink
    { bg: 'B4FFB4', text: '333333' }, // Light green
    { bg: 'FFD4B4', text: '333333' }, // Light orange
    { bg: 'E5B4FF', text: '333333' }, // Lavender
    { bg: 'B4FFFF', text: '333333' }, // Cyan
    { bg: 'FFFFB4', text: '333333' }, // Light yellow
  ];
  
  const color = colors[index % colors.length];
  const sceneNumber = index + 1;
  const encodedText = encodeURIComponent(`Scene ${sceneNumber}`);
  
  return `https://placehold.co/800x600/${color.bg}/${color.text}?text=${encodedText}`;
}
