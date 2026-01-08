# AI Image Generation Setup Guide

## Current Status
The app currently uses placeholder images because free AI image generation services have limitations or are under maintenance. This guide explains how to integrate real AI-generated images.

## Recommended Solutions (Pick One)

### Option 1: OpenAI DALL-E (Best Quality, Paid)
**Cost:** $0.040 per image (1024x1024)
**Setup:**
1. Get API key from https://platform.openai.com/api-keys
2. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
3. Update `app/api/generate-story/route.ts` to use DALL-E

```typescript
const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'dall-e-3',
    prompt: enhancedPrompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  }),
});

const data = await imageResponse.json();
return data.data[0].url;
```

### Option 2: Replicate (Good Quality, Pay-as-you-go)
**Cost:** ~$0.002-0.01 per image
**Models:** FLUX.1, Stable Diffusion XL, and more
**Setup:**
1. Get API key from https://replicate.com
2. Install: `npm install replicate`
3. Add to `.env.local`: `REPLICATE_API_TOKEN=r8_...`

```typescript
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "black-forest-labs/flux-schnell",
  {
    input: {
      prompt: enhancedPrompt,
      num_outputs: 1,
    }
  }
);

return output[0];
```

### Option 3: Stability AI (Good Quality, Paid)
**Cost:** $0.03 per image
**Setup:**
1. Get API key from https://platform.stability.ai
2. Add to `.env.local`: `STABILITY_API_KEY=sk-...`

```typescript
const formData = new FormData();
formData.append('prompt', enhancedPrompt);
formData.append('output_format', 'png');

const imageResponse = await fetch(
  'https://api.stability.ai/v2beta/stable-image/generate/core',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
      'Accept': 'image/*'
    },
    body: formData,
  }
);

const imageBuffer = await imageResponse.arrayBuffer();
const base64 = Buffer.from(imageBuffer).toString('base64');
return `data:image/png;base64,${base64}`;
```

### Option 4: Free Tier Options (Limited)
**Note:** Most free AI image services have rate limits or quality restrictions

1. **Hugging Face Inference API** (Free tier available)
   - Limited to smaller models
   - Rate limits apply
   - May have queue times

2. **Together.ai** (Free credits to start)
   - Good quality
   - $25 free credits
   - https://api.together.xyz

## Implementation Steps

1. Choose one of the options above
2. Get your API key
3. Add the key to `.env.local`
4. Replace the image generation code in `/app/api/generate-story/route.ts`
5. Test with a story generation
6. Monitor costs and usage

## Cost Estimates

For a 5-scene story:
- **DALL-E:** ~$0.20 per story
- **Replicate:** ~$0.01-0.05 per story  
- **Stability AI:** ~$0.15 per story

## Current Placeholder System

Until you integrate a paid service, the app uses:
- Descriptive text placeholders showing scene content
- This helps visualize the story structure
- Easy to swap out once AI service is configured

## Need Help?

- OpenAI Docs: https://platform.openai.com/docs/guides/images
- Replicate Docs: https://replicate.com/docs
- Stability AI Docs: https://platform.stability.ai/docs
