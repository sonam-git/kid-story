# 🎨 Story Magic - Kid-Friendly AI Storytelling App

A delightful Next.js application that allows kids to create their own AI-generated stories with custom characters, genres, and beautiful illustrations. Stories can be saved, replayed with text-to-speech narration, and enjoyed in a full-screen immersive mode.

**✨ Now with FREE AI story generation using Hugging Face! ✨**

## 🖼️ Image Generation - Your Options

**Reality Check:** There are currently **NO truly free AI image generation services** that work reliably in 2026.

### ✅ Current Status: Beautiful Placeholders (FREE)
The app uses colorful, descriptive placeholders showing scene content. Works perfectly!

### � Best Option: Replicate API (~$0.015/story)
**Most affordable and high-quality option!**
- 💰 **Super cheap**: $10 = ~666 stories
- 🎨 **High quality**: FLUX or Stable Diffusion XL
- ⚡ **Fast**: 2-5 seconds per image
- 🆓 **Free credits**: New accounts get starter credits

**📖 See [REPLICATE_SETUP.md](./REPLICATE_SETUP.md) for 5-minute setup**

### Alternative: DALL-E ($0.20/story)
Already configured! Just add OpenAI credits:
- **📖 See [DALLE_SETUP.md](./DALLE_SETUP.md)**
- Higher quality but 13x more expensive

### Keep Using Placeholders (FREE)
The app is fully functional with descriptive placeholders!

## ✨ Features

### 🎭 Story Creation
- **Dynamic Character Input**: Add unlimited characters with names
- **Story Description**: Kids describe what their story should be about
- **Genre Selection**: Choose from multiple genres:
  - Funny, Educational, Adventure, Fantasy, Happy, Sad, Bedtime Story

### 🤖 AI Story Generation
- **Free Hugging Face Integration**: Uses Qwen 2.5 72B for creative story generation
- **Free AI-Generated Images**: Stable Diffusion 2.1 for unique illustrations
- 100% FREE - No credit card required, ever!
- Generates kid-friendly stories (ages 5-10)
- Creates 5 scene-based narratives with engaging text and real AI-generated images

### 💾 Local Storage
- Stories persist in browser local storage
- View all saved stories in your library

### 🎧 Story Player
- Full-screen immersive reading experience
- Text-to-Speech narration using Web Speech API
- Play/Pause, Previous/Next navigation
- Auto-advance to next scene

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ installed
- Free Hugging Face account (get from [huggingface.co](https://huggingface.co/join))

### Installation

1. **Clone or download the project**

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Hugging Face API key** (FREE!):
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your Hugging Face API key
HUGGINGFACE_API_KEY=hf_your-key-here
```

> 📖 **Need help?** See [HUGGINGFACE_SETUP.md](./HUGGINGFACE_SETUP.md) for detailed instructions

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 💰 Cost Information

**100% FREE FOREVER!** 🎉

- Uses Hugging Face Inference API (completely free)
- Real AI story generation with Qwen 2.5 72B
- Real AI image generation with Stable Diffusion 2.1
- No credit card required
- No usage limits for personal projects
- Perfect for learning and prototyping!

## 📚 Documentation

- **[HUGGINGFACE_SETUP.md](./HUGGINGFACE_SETUP.md)** - Complete Hugging Face setup guide (5 minutes!)
- **[QUICK_START.md](./QUICK_START.md)** - User guide for kids & parents
- **[AI_INTEGRATION.md](./AI_INTEGRATION.md)** - Alternative AI providers

## 🎯 How It Works

1. **User Input**: Kids enter characters, description, and genres
2. **AI Generation**: 
   - Qwen 2.5 72B creates a unique 5-scene story
   - Stable Diffusion 2.1 generates custom illustrations for each scene
3. **Local Storage**: Story saved in browser
4. **Playback**: Full-screen player with text-to-speech

## 📁 Project Structure

```
kid-story/
├── app/
│   ├── api/generate-story/  # Hugging Face API route
│   ├── create-story/        # Story creation page (deprecated)
│   ├── my-stories/          # Stories library
│   └── page.tsx             # Home page with create modal
├── components/
│   ├── StoryModal.tsx       # Creation modal
│   ├── StoryCard.tsx        # Story display
│   └── StoryPlayer.tsx      # Full-screen player
├── services/
│   ├── ttsService.ts        # Text-to-speech
│   └── storageService.ts    # Local storage
└── types/
    └── story.ts             # TypeScript types
```

## 🔒 Security

- ✅ API keys stored in environment variables (never exposed to browser)
- ✅ Server-side API calls only
- ✅ Input validation
- ✅ Hugging Face's built-in content moderation
- ✅ `.env.local` in `.gitignore`

## 🎨 Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Hugging Face** - Qwen 2.5 72B + Stable Diffusion 2.1 (100% FREE!)
- **Web Speech API** - Text-to-speech
- **Local Storage** - Data persistence

## 🚀 Deployment

Ready to deploy? See Next.js deployment docs:
- [Vercel](https://vercel.com/new) - Recommended
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)

**Remember**: Add `HUGGINGFACE_API_KEY` to your deployment environment variables!

## 🌟 Why Hugging Face?

- **100% Free** - No credit card, no trial, completely free
- **State-of-the-art AI** - Better than GPT-3.5, comparable to GPT-4
- **Real Images** - Not placeholders, actual AI-generated art
- **Open Source** - Transparent and ethical AI
- **No Vendor Lock-in** - You own your implementation
- **Educational** - Perfect for learning AI development

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
