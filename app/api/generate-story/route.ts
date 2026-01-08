import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Replicate from 'replicate';
import type { StoryInput, Story, Scene } from '@/types/story';

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_API_URL = 'https://router.huggingface.co/v1';

// Replicate API configuration (for FLUX image generation)
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

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

    // Generate images for each scene using Replicate FLUX
    console.log('Generating AI images with Replicate (FLUX)...');
    
    if (!REPLICATE_API_TOKEN || REPLICATE_API_TOKEN === 'your_replicate_api_key_here') {
      console.warn('⚠️  Replicate API token not configured. Using placeholders.');
      console.warn('To use real AI images, add your REPLICATE_API_TOKEN to .env.local');
      console.warn('Get your token from: https://replicate.com/account/api-tokens');
      
      const imageUrls = result.scenes.map((scene: any, index: number) => 
        generatePlaceholderImage(scene.imagePrompt, index)
      );
      
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
        coverImage: imageUrls[0],
        createdAt: new Date().toISOString(),
      };
      
      return NextResponse.json(story);
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });

    // Generate images sequentially with delays to avoid rate limits
    const imageUrls: string[] = [];
    for (let index = 0; index < result.scenes.length; index++) {
      const scene = result.scenes[index];
      try {
        console.log(`Generating image ${index + 1}/5 with FLUX...`);
        console.log(`Prompt: ${scene.imagePrompt}`);
        
        // Enhanced prompt for realistic, story-based illustration
        const enhancedPrompt = `${scene.imagePrompt}. High-quality realistic children's book illustration, vibrant colors, detailed, professional quality, kid-friendly, cheerful atmosphere, photorealistic storybook art, 4K, masterpiece`;
        
        // Use FLUX 1.1 Pro with predictions API to get URL (not streamed binary)
        console.log(`  🚀 Creating FLUX 1.1 Pro prediction...`);
        
        let prediction = await replicate.predictions.create({
          model: "black-forest-labs/flux-1.1-pro",
          input: {
            prompt: enhancedPrompt,
            aspect_ratio: "4:3",
            output_format: "jpg",
            output_quality: 90,
            safety_tolerance: 6,
            prompt_upsampling: true,
          }
        });

        console.log(`  ⏳ Waiting for prediction to complete...`);
        console.log(`  🆔 Prediction ID: ${prediction.id}`);
        
        // Wait for the prediction to complete
        prediction = await replicate.wait(prediction);
        
        console.log(`  ✅ Prediction complete! Status: ${prediction.status}`);
        
        let imageUrl: string;
        
        // Check the prediction output
        if (prediction.status === 'succeeded' && prediction.output) {
          const output = prediction.output;
          console.log(`  📦 Output type: ${typeof output}`);
          console.log(`  📦 Is array: ${Array.isArray(output)}`);
          
          if (typeof output === 'string' && output.startsWith('http')) {
            imageUrl = output;
            console.log(`  ✓ Got direct URL from prediction output`);
          } else if (Array.isArray(output) && output.length > 0 && typeof output[0] === 'string') {
            imageUrl = output[0];
            console.log(`  ✓ Got URL from array in prediction output`);
          } else {
            console.error(`  ❌ Unexpected output format:`, output);
            imageUrl = 'invalid';
          }
        } else {
          console.error(`  ❌ Prediction failed or no output. Status: ${prediction.status}`);
          if (prediction.error) {
            console.error(`  ❌ Error:`, prediction.error);
          }
          imageUrl = 'invalid';
        }
        
        console.log(`\n✓ Image ${index + 1}/5 processed!`);
        console.log(`  📸 Image URL: ${imageUrl}`);
        console.log(`  📏 URL length: ${imageUrl.length}`);
        console.log(`  🔗 URL preview: ${imageUrl.substring(0, Math.min(80, imageUrl.length))}...`);
        
        // Validate the URL is actually a valid string
        if (!imageUrl || 
            imageUrl === '[object Object]' || 
            imageUrl === 'undefined' || 
            imageUrl === 'invalid' ||
            imageUrl.includes('function') ||
            imageUrl.includes('url()')) {
          console.error(`  ❌ Invalid URL detected!`);
          imageUrls.push(generatePlaceholderImage(scene.imagePrompt, index));
        } else {
          imageUrls.push(imageUrl);
        }
        
        // Add delay between requests to respect rate limits (except after last image)
        if (index < result.scenes.length - 1) {
          console.log(`Waiting 12 seconds before next image...`);
          await new Promise(resolve => setTimeout(resolve, 12000));
        }
      } catch (imgError: any) {
        console.error(`Error generating image ${index + 1}:`, imgError);
        
        // Check if it's a rate limit error and retry after delay
        if (imgError.message?.includes('429') || imgError.message?.includes('rate limit')) {
          console.log(`Rate limit hit. Waiting 15 seconds and retrying...`);
          await new Promise(resolve => setTimeout(resolve, 15000));
          
          // Retry once using predictions API
          try {
            console.log(`  🔄 Retry: Creating prediction...`);
            let retryPrediction = await replicate.predictions.create({
              model: "black-forest-labs/flux-1.1-pro",
              input: {
                prompt: `${scene.imagePrompt}. High-quality realistic children's book illustration, vibrant colors, detailed, professional quality, kid-friendly, cheerful atmosphere, photorealistic storybook art, 4K, masterpiece`,
                aspect_ratio: "4:3",
                output_format: "jpg",
                output_quality: 90,
                safety_tolerance: 6,
                prompt_upsampling: true,
              }
            });
            
            retryPrediction = await replicate.wait(retryPrediction);
            
            let retryImageUrl: string;
            
            if (retryPrediction.status === 'succeeded' && retryPrediction.output) {
              const retryOutput = retryPrediction.output;
              
              if (typeof retryOutput === 'string' && retryOutput.startsWith('http')) {
                retryImageUrl = retryOutput;
                console.log(`  ✓ Retry: Got direct URL`);
              } else if (Array.isArray(retryOutput) && retryOutput.length > 0 && typeof retryOutput[0] === 'string') {
                retryImageUrl = retryOutput[0];
                console.log(`  ✓ Retry: Got URL from array`);
              } else {
                console.error(`  ❌ Retry: Unexpected output format`);
                retryImageUrl = 'invalid';
              }
            } else {
              console.error(`  ❌ Retry: Prediction failed. Status: ${retryPrediction.status}`);
              retryImageUrl = 'invalid';
            }
            
            console.log(`✓ Image ${index + 1}/5 generated successfully on retry!`);
            console.log(`  Retry image URL: ${retryImageUrl}`);
            console.log(`  Retry URL preview: ${retryImageUrl.substring(0, Math.min(50, retryImageUrl.length))}...`);
            
            if (!retryImageUrl || 
                retryImageUrl === '[object Object]' || 
                retryImageUrl === 'undefined' ||
                retryImageUrl === 'invalid' ||
                retryImageUrl.includes('function') ||
                retryImageUrl.includes('url()')) {
              imageUrls.push(generatePlaceholderImage(scene.imagePrompt, index));
            } else {
              imageUrls.push(retryImageUrl);
            }
          } catch (retryError: any) {
            console.log(`Retry failed for image ${index + 1}:`, retryError.message);
            imageUrls.push(generatePlaceholderImage(scene.imagePrompt, index));
          }
        } else {
          console.log(`Using placeholder for image ${index + 1}`);
          imageUrls.push(generatePlaceholderImage(scene.imagePrompt, index));
        }
      }
    }
    
    console.log('All images generated successfully!');
    console.log('Image URLs:', imageUrls);

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
        imageUrl: imageUrls[index] || generatePlaceholderImage(scene.imagePrompt, index),
      })),
      coverImage: imageUrls[0] || generatePlaceholderImage(result.scenes[0]?.imagePrompt || 'Story cover', 0),
      createdAt: new Date().toISOString(),
    };
    
    console.log('Story object created:');
    console.log('  Cover image:', story.coverImage);
    console.log('  Scene 1 image:', story.scenes[0]?.imageUrl);

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

// Helper function to generate descriptive placeholder images with scene context
function generatePlaceholderImage(prompt: string, index: number): string {
  // Array of beautiful, kid-friendly gradient colors
  const colors = [
    { bg: '9333EA/EC4899', text: 'FFFFFF', emoji: '🌟' }, // Purple to Pink
    { bg: '3B82F6/8B5CF6', text: 'FFFFFF', emoji: '✨' }, // Blue to Purple
    { bg: 'EC4899/F97316', text: 'FFFFFF', emoji: '🎨' }, // Pink to Orange
    { bg: '10B981/3B82F6', text: 'FFFFFF', emoji: '🌈' }, // Green to Blue
    { bg: 'F59E0B/EF4444', text: 'FFFFFF', emoji: '🎭' }, // Yellow to Red
  ];
  
  const color = colors[index % colors.length];
  const sceneNumber = index + 1;
  
  // Create a short, readable description from the prompt
  const shortDesc = prompt.substring(0, 80).replace(/[^\w\s]/g, ' ').trim();
  const encodedDesc = encodeURIComponent(`Scene ${sceneNumber}: ${shortDesc}...`);
  
  // Use a gradient placeholder with the scene description
  return `https://placehold.co/1024x768/${color.bg}/${color.text}/png?text=${color.emoji}+${encodedDesc}&font=roboto`;
}
