# 🚀 Quick Deployment Guide

## Fastest Way to Deploy (5 minutes)

### Method 1: Vercel Website (Recommended for First Time)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/kid-story.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Add environment variables:
     - `HUGGINGFACE_API_KEY`
     - `REPLICATE_API_TOKEN`
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI (For Quick Updates)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔑 Environment Variables (CRITICAL!)

Make sure to add these in Vercel dashboard:

```
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

**⚠️ Without these, your app won't work!**

## ✅ Pre-Deployment Checklist

- [ ] Code works locally (`npm run dev`)
- [ ] `.env.local` exists locally (but NOT in git)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] API keys ready to paste

## 🎯 What Happens After Deploy

1. Vercel builds your Next.js app (~2 minutes)
2. Deploys to global CDN
3. Gives you a URL: `https://kid-story-xyz.vercel.app`
4. Auto-redeploys on every git push

## 📱 Share Your App

Once deployed, anyone can use your app at:
```
https://your-project-name.vercel.app
```

## 🆘 Common Issues

**Build Fails**:
- Check Vercel logs
- Make sure all dependencies are in `package.json`
- Verify Node.js version compatibility

**"Environment variable not found"**:
- Add API keys in Vercel dashboard
- Settings → Environment Variables
- Redeploy after adding

**Images don't load**:
- Verify `REPLICATE_API_TOKEN` is correct
- Check function logs in Vercel

**API errors**:
- Verify `HUGGINGFACE_API_KEY` is correct
- Check if you have API credits/quota

## 💡 Pro Tips

1. **Free Tier**: Perfect for demos and personal use
2. **Custom Domain**: Add your own domain for free
3. **Analytics**: Enable Vercel Analytics to track usage
4. **Preview Deployments**: Every PR gets a preview URL
5. **Instant Rollback**: One-click rollback to previous versions

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your App** (after deploy): Check Vercel dashboard
- **Vercel Docs**: https://vercel.com/docs

---

**Time to deploy: 5 minutes** ⏱️  
**Cost: FREE** 💰  
**Difficulty: Easy** ✨

Let's go! 🚀
