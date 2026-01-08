#!/bin/bash

# 🚀 Vercel Deployment Script
# This script helps you deploy your Kid Story app to Vercel

echo "🎨 Kid Story - Vercel Deployment Helper"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "⚠️  Git is not initialized!"
    echo "📝 Initializing git..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo ""
    echo "⚠️  No git remote found!"
    echo "📝 Please create a repository on GitHub, then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/kid-story.git"
    echo ""
    read -p "Have you created a GitHub repository? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your repository URL: " repo_url
        git remote add origin "$repo_url"
        echo "✅ Remote added"
    else
        echo "❌ Please create a GitHub repository first"
        exit 1
    fi
else
    echo "✅ Git remote exists"
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo ""
    echo "📝 Committing changes..."
    git add .
    git commit -m "Prepare for Vercel deployment"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "⚠️  Push failed. You may need to force push or resolve conflicts."
    read -p "Try force push? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main --force
    fi
fi

echo ""
echo "========================================"
echo "🎉 Ready for Vercel Deployment!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New Project'"
echo "4. Import your 'kid-story' repository"
echo "5. Add environment variables:"
echo "   - HUGGINGFACE_API_KEY=your_key"
echo "   - REPLICATE_API_TOKEN=your_token"
echo "6. Click 'Deploy'"
echo ""
echo "OR use Vercel CLI:"
echo ""
echo "   npm install -g vercel"
echo "   vercel login"
echo "   vercel"
echo ""
echo "📚 Full guide: See DEPLOY-VERCEL.md"
echo ""
