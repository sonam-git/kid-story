# ⚡ Quick Start - Get Your API Key

## 🎯 You're Almost Ready!

Your app is **fully configured** to use OpenAI's AI. You just need to add your API key!

## 📝 3 Simple Steps

### Step 1: Get Your OpenAI API Key (5 minutes)

1. Go to: **https://platform.openai.com/**
2. Click **"Sign Up"** (or "Log In" if you have an account)
3. Navigate to **"API Keys"** in the left sidebar
4. Click **"Create new secret key"**
5. **Copy the key** (looks like: `sk-proj-abc123...`)

> 💡 **Tip**: You get **$10 free credits** when you sign up!

### Step 2: Add the Key to Your Project

Open your terminal in the project folder and run:

```bash
# Create the environment file
cp .env.local.example .env.local
```

Then open `.env.local` and replace the placeholder:

```env
OPENAI_API_KEY=sk-proj-YOUR-ACTUAL-KEY-HERE
```

### Step 3: Restart the Server

```bash
# Press Ctrl+C to stop the current server
# Then restart:
npm run dev
```

## ✅ Test It!

1. Go to **http://localhost:3000**
2. Click **"Create Your Story"**
3. Fill in:
   - **Characters**: Max, Luna
   - **Description**: Two friends discover a magical treehouse
   - **Genres**: Adventure, Fantasy
4. Click **"Create Story"**
5. Wait ~20-30 seconds ⏳
6. **Enjoy your unique AI story!** 🎉

## 🎊 What You'll Get

- ✨ **Unique story** written by GPT-4o-mini (never the same twice!)
- 🎨 **5 custom illustrations** created by DALL-E 3
- 📖 **Kid-friendly content** (ages 5-10)
- 🎧 **Read-aloud feature** using text-to-speech

## 💰 Cost Reminder

- Each story costs **~$0.21**
- You get **$10 free** = ~47 stories
- Monitor usage at: https://platform.openai.com/usage

## 🆘 Need Help?

**API key not working?**
- Make sure it starts with `sk-`
- Check for extra spaces
- Verify you saved `.env.local` (not `.env.local.example`)
- Restart the dev server

**Still having issues?**
See the detailed guide: [OPENAI_SETUP.md](./OPENAI_SETUP.md)

---

**That's it! You're ready to create magical AI stories! 🚀✨**
