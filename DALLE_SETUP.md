# 🎨 DALL-E Image Generation Setup

## Quick Setup Guide

### Step 1: Get Your OpenAI API Key

1. **Go to OpenAI Platform**: https://platform.openai.com/api-keys
2. **Sign up or log in** to your account
3. **Click "Create new secret key"**
4. **Copy the key** (starts with `sk-...`)
5. **Important**: Save it somewhere safe - you can't see it again!

### Step 2: Add API Key to Your Project

1. Open `.env.local` file in your project root
2. Replace `your-openai-api-key-here` with your actual API key:

```bash
OPENAI_API_KEY=sk-proj-...your-actual-key...
```

3. Save the file

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It!

1. Open http://localhost:3000
2. Click "Create Story"
3. Fill in the form and generate a story
4. Wait about 30-40 seconds (DALL-E takes time to generate 5 images)
5. Enjoy your story with real AI-generated illustrations! 🎉

## 💰 Pricing

DALL-E 3 Standard Quality (1024x1024):
- **$0.040 per image**
- **5 images per story = $0.20 per story**

### Free Trial
- New OpenAI accounts get **$5 in free credits**
- This gives you ~25 stories for free!
- Credits expire after 3 months

### Tips to Save Credits
- Test with fewer scenes initially
- Use DALL-E 2 instead ($0.020/image):
  - Change `model: 'dall-e-3'` to `model: 'dall-e-2'`
  - In `/app/api/generate-story/route.ts`

## 🔍 Troubleshooting

### "Invalid API key"
- Make sure you copied the full key including `sk-`
- Check there are no extra spaces
- Verify the key is in `.env.local`, not `.env.local.example`

### "Rate limit exceeded"
- DALL-E has rate limits (5 images/minute on free tier)
- The app generates 5 images, so wait ~1 minute between stories
- Or upgrade your OpenAI plan

### Images not showing
- Check browser console for errors
- Make sure server restarted after adding API key
- Verify API key has credits remaining

## 🎯 What You'll Get

With DALL-E integration, each story scene will have:
- ✨ **Unique AI-generated illustrations**
- 🎨 **Realistic, high-quality images**
- 📖 **Story-matched content** (not generic placeholders)
- 👶 **Kid-friendly, safe artwork**

## 🆓 Alternative: Keep Using Placeholders

If you don't want to use a paid service:
- The app works perfectly with descriptive placeholders
- Shows scene descriptions in colorful designs
- Still fully functional for story creation and playback
- Can add AI images later when ready

## 📚 More Info

- OpenAI Pricing: https://openai.com/pricing
- DALL-E Docs: https://platform.openai.com/docs/guides/images
- API Keys: https://platform.openai.com/api-keys
