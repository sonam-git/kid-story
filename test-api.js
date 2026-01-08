#!/usr/bin/env node

/**
 * Test script to verify Hugging Face API key is working
 * Run with: node test-api.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    console.log('\n📝 Please create .env.local file with your API key:');
    console.log('   HUGGINGFACE_API_KEY=hf_your-key-here\n');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^HUGGINGFACE_API_KEY=(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  
  return null;
}

function testAPI(apiKey) {
  console.log('🔍 Testing Hugging Face API key...\n');

  const postData = JSON.stringify({
    inputs: "Hello, how are you?",
    parameters: {
      max_new_tokens: 20,
      return_full_text: false
    }
  });

  const options = {
    hostname: 'api-inference.huggingface.co',
    path: '/models/Qwen/Qwen2.5-72B-Instruct',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! Your API key is working!\n');
        console.log('🎉 You\'re ready to create AI-powered stories!\n');
        console.log('Next steps:');
        console.log('  1. Run: npm run dev');
        console.log('  2. Open: http://localhost:3000');
        console.log('  3. Click "Create Your Story" and have fun!\n');
      } else if (res.statusCode === 401) {
        console.error('❌ FAILED! Invalid API key.\n');
        console.log('📝 Please check your .env.local file:');
        console.log('   - Make sure the key starts with "hf_"');
        console.log('   - Get a new key at: https://huggingface.co/settings/tokens\n');
      } else if (res.statusCode === 503) {
        console.log('⚠️  Model is loading (this is normal on first use)');
        console.log('✅ Your API key is valid!\n');
        console.log('💡 The model will be ready in 20-30 seconds. Try running the app now.\n');
      } else {
        console.error(`❌ Error: HTTP ${res.statusCode}`);
        console.error(data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Connection error:', error.message);
    console.log('\n💡 Please check your internet connection.');
  });

  req.write(postData);
  req.end();
}

// Main
console.log('🤗 Hugging Face API Key Tester\n');
console.log('=' .repeat(50) + '\n');

const apiKey = loadEnv();

if (!apiKey || apiKey === 'your-huggingface-api-key-here') {
  console.error('❌ No API key found in .env.local!\n');
  console.log('📖 Setup instructions:');
  console.log('   1. Sign up at: https://huggingface.co/join');
  console.log('   2. Get your token: https://huggingface.co/settings/tokens');
  console.log('   3. Add to .env.local: HUGGINGFACE_API_KEY=hf_your-key-here');
  console.log('\n📚 See HUGGINGFACE_SETUP.md for detailed instructions.\n');
  process.exit(1);
}

testAPI(apiKey);
