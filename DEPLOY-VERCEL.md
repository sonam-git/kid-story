# 🚀 Deploy to Vercel - Complete Guide

## Prerequisites

✅ Your app is working locally
✅ You have a GitHub account
✅ You have API keys:
   - Hugging Face API Key
   - Replicate API Token

## Step 1: Push to GitHub

If you haven't already, initialize git and push to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Kid Story AI App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/kid-story.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "Add New Project"**
4. **Import your GitHub repository** (`kid-story`)
5. **Configure the project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Add Environment Variables** (CRITICAL!):
   - Click "Environment Variables"
   - Add these:
     ```
     HUGGINGFACE_API_KEY=your_huggingface_key_here
     REPLICATE_API_TOKEN=your_replicate_token_here
     ```
7. **Click "Deploy"**
8. **Wait 2-3 minutes** for the build to complete
9. **Your app is live!** 🎉

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from your project directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? kid-story
# - Directory? ./
# - Override settings? No

# Add environment variables after first deploy
vercel env add HUGGINGFACE_API_KEY
vercel env add REPLICATE_API_TOKEN

# Deploy to production
vercel --prod
```

## Step 3: Configure Environment Variables

After deployment, if you didn't add them during setup:

1. Go to your project on Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - `HUGGINGFACE_API_KEY` = your key
   - `REPLICATE_API_TOKEN` = your token
4. Select environments: **Production, Preview, Development**
5. Click **Save**
6. **Redeploy** the project for changes to take effect

## Step 4: Test Your Deployment

1. Visit your Vercel URL (e.g., `kid-story.vercel.app`)
2. Test creating a story
3. Verify images load
4. Check all features work

## Step 5: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## 🔒 Security Checklist

✅ **DO NOT** commit `.env.local` to GitHub
✅ **DO** add environment variables in Vercel dashboard
✅ **DO** keep API keys secure
✅ **DO** use Vercel's environment variable encryption

## 📊 Expected Deployment Details

- **Build Time**: 1-3 minutes
- **Deploy Time**: 30 seconds - 1 minute
- **URL Format**: `https://kid-story-username.vercel.app`
- **SSL**: Automatic (free HTTPS)
- **CDN**: Global edge network
- **Auto-redeploy**: On every git push to main

## 🐛 Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Fix**: Make sure all dependencies are in `package.json`
- Run: `npm install` locally to verify

**Error**: `Environment variable not found`
- **Fix**: Add API keys in Vercel dashboard
- Redeploy after adding

### Images Not Loading

**Error**: Images show placeholders
- **Fix**: Verify `REPLICATE_API_TOKEN` is set correctly
- Check Vercel function logs for errors

**Error**: "Invalid API key"
- **Fix**: Verify `HUGGINGFACE_API_KEY` is correct
- Test locally with same key first

### API Timeouts

**Error**: Functions timeout
- **Fix**: Vercel has 10-60 second limits depending on plan
- Consider upgrading plan if needed
- FLUX generation takes ~10-20 seconds per image

## 💰 Vercel Pricing

### Hobby Plan (FREE)
- Perfect for personal projects
- **100 GB** bandwidth/month
- **100 hours** serverless function execution
- Automatic HTTPS
- Global CDN
- **Should be sufficient** for testing and personal use

### Pro Plan ($20/month)
- For production/public apps
- **1 TB** bandwidth
- **1000 hours** function execution
- Better performance
- Priority support

### Cost Estimate for Your App

**Free Tier Should Cover**:
- ~1000 story generations/month
- Moderate traffic
- Perfect for demo/portfolio

**Upgrade If**:
- High traffic (100+ users/day)
- Many concurrent story generations
- Need faster function execution

## 📈 Post-Deployment

### Monitor Your App

1. **Vercel Dashboard**: Monitor deployments and errors
2. **Analytics**: Enable Vercel Analytics (free)
3. **Logs**: Check function logs for errors
4. **Speed Insights**: Monitor performance

### Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically detects the push
2. Builds your project
3. Runs tests (if configured)
4. Deploys to production
5. Notifies you of status

## 🎉 Success Checklist

After deployment, verify:

- [ ] App loads at Vercel URL
- [ ] Homepage displays correctly
- [ ] Can create new story
- [ ] Story text generates (Hugging Face works)
- [ ] Images generate (Replicate works)
- [ ] Images display in UI
- [ ] Text-to-speech works
- [ ] Stories save to localStorage
- [ ] Can view saved stories
- [ ] Story player works
- [ ] All scenes display
- [ ] No console errors

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables

## 🆘 Getting Help

If you encounter issues:

1. Check **Vercel deployment logs**
2. Check **Function logs** for API errors
3. Visit **Vercel Discord**: https://vercel.com/discord
4. Check **Next.js docs**: https://nextjs.org/docs

---

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Check deployment status
vercel ls

# Pull environment variables locally
vercel env pull

# Remove a deployment
vercel remove [deployment-url]
```

---

**Your app should be live in under 5 minutes!** 🚀

After deployment, share your URL! 🎉
