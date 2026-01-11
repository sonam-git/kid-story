#!/bin/bash

# ImagiKids Auth Test Script
# This script helps you verify your authentication setup

echo "🔐 ImagiKids Authentication Test"
echo "=================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo "   Please create .env.local from .env.local.example"
    echo ""
    exit 1
fi

echo "✅ .env.local found"
echo ""

# Check for MongoDB URI
if grep -q "MONGODB_URI=your-mongodb" .env.local; then
    echo "⚠️  Warning: MongoDB URI not configured"
    echo "   Please update MONGODB_URI in .env.local"
    echo ""
else
    echo "✅ MongoDB URI configured"
fi

# Check for JWT Secret
if grep -q "JWT_SECRET=your-super-secret" .env.local; then
    echo "⚠️  Warning: JWT Secret not configured"
    echo "   Please update JWT_SECRET in .env.local"
    echo ""
else
    echo "✅ JWT Secret configured"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules not found"
    echo "   Running npm install..."
    npm install
    echo ""
fi

echo "✅ Dependencies installed"
echo ""

# Check if MongoDB packages are installed
if [ ! -d "node_modules/mongoose" ]; then
    echo "❌ Error: mongoose not installed"
    echo "   Please run: npm install"
    exit 1
fi

echo "✅ Authentication packages installed"
echo ""

echo "🚀 Starting test server..."
echo ""
echo "Next steps:"
echo "1. Server will start on http://localhost:3000"
echo "2. Click 'Sign Up' to create a test account"
echo "3. Create a story and verify it saves"
echo "4. Refresh the page - story should persist!"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
