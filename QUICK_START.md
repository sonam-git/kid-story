# 🎯 Quick Start Guide - Story Magic

## For Developers

### Setup (5 minutes)

1. **Get a FREE Hugging Face API key**:
   - Sign up at [https://huggingface.co/join](https://huggingface.co/join)
   - Get your token at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - See [HUGGINGFACE_SETUP.md](./HUGGINGFACE_SETUP.md) for details

2. **Add your API key**:
   ```bash
   # Copy example file
   cp .env.local.example .env.local
   
   # Edit .env.local and add your key
   HUGGINGFACE_API_KEY=hf_your-key-here
   ```

3. **Run the app**:
   ```bash
   npm install
   npm run dev
   ```

### Running the App

1. **Development Mode**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000)

2. **Production Build**
   ```bash
   npm run build
   npm start
   ```

### Project Structure

```
kid-story/
├── app/                    # Next.js App Router pages
│   ├── api/generate-story/# Hugging Face API route
│   ├── my-stories/        # Stories library
│   └── page.tsx           # Home with create modal
├── components/            # React components
│   ├── StoryModal.tsx    # Creation modal
│   ├── StoryCard.tsx     # Story display card
│   └── StoryPlayer.tsx   # Full-screen player
├── services/             # Business logic
│   ├── ttsService.ts     # Text-to-speech
│   └── storageService.ts # Local storage
└── types/
    └── story.ts          # TypeScript types
```

## For Kids & Parents

### How to Create a Story

1. **Click "Create Your Story"** on the home page
2. **Add Characters**: Type names of your heroes
3. **Describe Your Story**: Tell us what should happen
4. **Pick Genres**: Choose what kind of story (Funny, Adventure, etc.)
5. **Click "Generate Story"**: Wait for the magic! ✨ (Takes ~1-2 minutes)

### How to Read Your Stories

1. Go to **"My Stories"**
2. Click **"Play Story"** on any story card
3. Use the **Play button** to hear the story read aloud
4. Use **arrows** to go forward or back
5. Click the **X** to exit

### Story Player Controls

- **▶️ Play**: Start reading the story aloud
- **⏸️ Pause**: Stop the narration
- **←**: Go to previous scene
- **→**: Go to next scene
- **Dots**: Jump to any scene
- **X**: Close the player

## Features

### ✅ What Works Now
- Create stories with custom characters
- Choose from 7 different genres
- Auto-generate 5-scene stories
- Save stories locally (browser storage)
- View all your stories
- Full-screen story player
- Text-to-speech narration
- Delete unwanted stories

### 🔜 Coming Soon (Requires AI Integration)
- Real AI-generated stories (currently uses templates)
- Custom AI-generated images (currently uses placeholders)
- More personalized content
- Longer stories

## Tips for Best Experience

### For Kids
- 🎨 Be creative with character names!
- 📝 Describe your story in detail
- 🎭 Mix different genres for unique stories
- 🔊 Turn up your volume for story time

### For Parents
- All content is kid-safe (ages 5-10)
- Stories are saved in browser only
- No internet required after loading
- No accounts or personal data collected
- Clear browsing data to remove all stories

## Troubleshooting

### Story not playing?
- Check your browser's sound settings
- Make sure text-to-speech is enabled in your browser
- Try a different browser (Chrome, Safari, Firefox work best)

### Can't hear narration?
- Click Play again
- Check volume settings
- Try using headphones

### Stories disappeared?
- Stories are saved in browser storage
- Clearing browser data removes stories
- Use the same browser to access saved stories

## Browser Support

✅ **Best Experience:**
- Google Chrome
- Safari (macOS/iOS)
- Microsoft Edge

⚠️ **Limited Support:**
- Firefox (TTS may vary)
- Mobile browsers (touch works great!)

---

**Have fun creating amazing stories! 🎨📚✨**
