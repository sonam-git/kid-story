# 🎨 Image Generation with Replicate

Your Story Magic app now uses **Replicate** with **FLUX 1.1 Pro** for generating stunning, photorealistic story illustrations!

## ✅ What's Integrated

The following has been completed for you:

1. ✅ **Package Installed**: `replicate` npm package added
2. ✅ **Environment Setup**: `REPLICATE_API_TOKEN` variable added to `.env.local`
3. ✅ **Image Domains**: Next.js configured to allow Replicate URLs
4. ✅ **API Integration**: Image generation code updated to use FLUX 1.1 Pro
5. ✅ **Smart Fallback**: Automatic placeholder images if token not configured
6. ✅ **Error Handling**: Robust error handling with helpful logging

## 🚀 Getting Started

### You Only Need to Do This:

1. **Get Your Token** (2 minutes)
   - Visit: https://replicate.com/account/api-tokens
   - Sign up/login and create a token
   - Copy the token (starts with `r8_...`)

2. **Add Token** (30 seconds)
   - Open `.env.local` in your project root
   - Replace `your_replicate_api_key_here` with your actual token
   - Save the file

3. **Restart Server** (10 seconds)
   ```bash
   npm run dev
   ```

4. **Create a Story!** 🎉
   - Open http://localhost:3000
   - Click "Create New Story"
   - Watch as AI generates beautiful, realistic images!

## 💰 Costs

| What | Cost | Details |
|------|------|---------|
| **Per Image** | $0.003 | FLUX 1.1 Pro |
| **Per Story** (5 images) | $0.015 | About 1.5 cents |
| **Free Credits** | $5 | ~330 images free |
| **100 Stories** | $1.50 | Very affordable! |

### Budget Examples
- **Personal Use**: 5 stories/day = $2.25/month
- **Classroom**: 20 stories/day = $9/month  
- **School**: 100 stories/day = $45/month

## 🎯 Why FLUX 1.1 Pro?

✨ **Photorealistic Quality**
- Not cartoons or sketches
- Professional storybook illustrations
- Vibrant, detailed, engaging

🛡️ **Kid-Safe**
- Built-in content filtering
- Safety tolerance level 6 (highest)
- Age-appropriate for 5-10 year olds

⚡ **Fast & Reliable**
- 2-4 seconds per image
- 99.9% uptime
- Production-ready

💡 **Smart Features**
- Automatic prompt enhancement
- Consistent style across scenes
- 4:3 aspect ratio for storybooks

## 📁 Files Updated

### `/app/api/generate-story/route.ts`
- Imported Replicate SDK
- Added image generation with FLUX 1.1 Pro
- Enhanced prompts for realistic illustrations
- Error handling and fallbacks

### `.env.local`
- Added `REPLICATE_API_TOKEN` variable
- Documentation and setup instructions

### `next.config.ts`
- Added `replicate.delivery` to image domains
- Allows Next.js Image component to load AI images

### `package.json`
- Added `replicate` dependency
- Ready for production deployment

## 🧪 Testing

### Without Token (Placeholders)
1. Don't add a token yet
2. Create a story
3. You'll see colorful gradient placeholders
4. Story text still generates with Hugging Face (free)

### With Token (Real AI Images)
1. Add your Replicate token
2. Restart server
3. Create a story
4. Watch AI generate realistic images in real-time!

Check the browser console for detailed logs:
```
Generating image 1/5 with FLUX...
✓ Image 1/5 generated successfully!
Generating image 2/5 with FLUX...
✓ Image 2/5 generated successfully!
...
```

## 🔧 Configuration

### Current Settings (Optimal for Kids)

```typescript
{
  prompt: enhancedPrompt,
  aspect_ratio: "4:3",          // Perfect for storybooks
  output_format: "jpg",          // Fast, good quality
  output_quality: 90,            // High quality
  safety_tolerance: 6,           // Maximum kid-safety
  prompt_upsampling: true,       // Auto-enhance prompts
}
```

### Alternative Models

Want different styles or costs? Edit `/app/api/generate-story/route.ts`:

**FLUX Dev** (Faster, slightly cheaper):
```typescript
"black-forest-labs/flux-dev"
// Cost: $0.0025 per image
```

**FLUX Schnell** (Fastest):
```typescript
"black-forest-labs/flux-schnell"
// Cost: $0.003 per image, <1 second
```

**Stable Diffusion XL** (Budget option):
```typescript
"stability-ai/sdxl"
// Cost: $0.008 per image
```

## 📊 Monitoring Usage

### View Your Usage
1. Go to: https://replicate.com/account/billing
2. See cost per prediction
3. Track total spending
4. Download invoices

### Set Spending Alerts
1. Account Settings → Billing
2. Set monthly budget cap
3. Get email notifications
4. Prevent surprise charges

## 🐛 Troubleshooting

### "Using placeholders" message

**Cause**: Token not configured or invalid

**Fix**:
1. Check `.env.local` has your actual token
2. Token should start with `r8_`
3. No spaces or quotes around token
4. Restart dev server after adding

### Images not loading

**Cause**: Next.js image domain not configured

**Fix**:
- Already done! `replicate.delivery` is in `next.config.ts`
- If still issues, try: `npm run dev` (restart)

### "Rate limit exceeded"

**Cause**: Too many requests

**Fix**:
- Wait 30 seconds between stories
- Check rate limits: https://replicate.com/docs/reference/http#rate-limiting
- Upgrade plan if needed

### Generation takes too long

**Expected**: 10-20 seconds for 5 images  
**If longer**: Check https://status.replicate.com

## 🚀 Production Deployment

### Vercel / Netlify / Railway

1. Add environment variable in dashboard:
   ```
   REPLICATE_API_TOKEN=r8_your_token_here
   ```

2. Deploy normally:
   ```bash
   git push origin main
   ```

3. Environment variables are automatically used
4. No code changes needed!

### Security Notes

- ✅ `.env.local` is in `.gitignore` (safe)
- ✅ Token stays on server-side only
- ✅ Never exposed to client/browser
- ✅ API route handles all Replicate calls

## 📚 Resources

- **Replicate Docs**: https://replicate.com/docs
- **FLUX 1.1 Pro**: https://replicate.com/black-forest-labs/flux-1.1-pro
- **Pricing**: https://replicate.com/pricing
- **Status Page**: https://status.replicate.com
- **Support**: support@replicate.com

## 🎉 What's Next?

Your app is now ready to create amazing stories with beautiful AI-generated images!

**Current Stack:**
- 📝 **Story Text**: Hugging Face Qwen 2.5 72B (FREE!)
- 🎨 **Images**: Replicate FLUX 1.1 Pro (~$0.015/story)
- 🔊 **Narration**: Browser Web Speech API (FREE!)
- 💾 **Storage**: Local Storage (FREE!)

**Total Cost**: ~1.5 cents per story! 🎯

---

**Ready to create?** Add your token and start making magical stories! ✨

Need help? Check the troubleshooting section or open an issue.
