/**
 * Create Sample Story for Testing Delete Functionality
 * This script creates a test story in MongoDB without using AI
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
const loadEnvFile = () => {
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = envContent.split('\n');
    
    envVars.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  } catch (error) {
    console.error('⚠️  Could not load .env.local file');
  }
};

loadEnvFile();

// MongoDB connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      console.log('💡 Make sure your .env.local file contains MONGODB_URI');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Story Schema (matching your model)
const sceneSchema = new mongoose.Schema({
  id: String,
  text: String,
  imagePrompt: String,
  imageUrl: String,
}, { _id: false });

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  genre: [String],
  characters: [String],
  description: String,
  scenes: [sceneSchema],
  coverImage: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
}, { timestamps: true });

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

// User Schema (to get your user ID)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Sample story data (using placeholder images from Unsplash)
const createSampleStory = async () => {
  try {
    await connectDB();

    // Get the first user from database (assuming you're logged in)
    console.log('🔍 Finding user...');
    const user = await User.findOne().sort({ createdAt: -1 });
    
    if (!user) {
      console.error('❌ No user found. Please create an account first.');
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user._id})`);

    // Create sample story with placeholder images
    const sampleStory = {
      userId: user._id,
      title: "🧪 Test Story - Delete Me!",
      genre: ["Adventure", "Fantasy"],
      characters: ["Bobby the Bear", "Lucy the Lion"],
      description: "This is a test story created for testing the delete functionality. Feel free to delete this!",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop", // Cute book cover
      scenes: [
        {
          id: "scene-1",
          text: "Once upon a time, Bobby the Bear woke up in a magical forest. The sun was shining through the tall trees!",
          imagePrompt: "A friendly bear waking up in a beautiful forest with sunlight",
          imageUrl: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=800&h=600&fit=crop" // Forest scene
        },
        {
          id: "scene-2",
          text: "Bobby met Lucy the Lion near a sparkling river. She was playing with colorful butterflies.",
          imagePrompt: "A lion playing with butterflies near a river",
          imageUrl: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=800&h=600&fit=crop" // Nature scene
        },
        {
          id: "scene-3",
          text: "Together, they discovered a hidden treasure chest filled with golden stars and magical crystals!",
          imagePrompt: "A treasure chest with stars and crystals",
          imageUrl: "https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800&h=600&fit=crop" // Treasure/magical scene
        },
        {
          id: "scene-4",
          text: "Bobby and Lucy became best friends and promised to have more adventures together. The End!",
          imagePrompt: "Two friends together in a beautiful sunset",
          imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop" // Sunset/friendship
        }
      ],
      likes: [],
      likesCount: 0,
    };

    console.log('📝 Creating sample story...');
    const story = await Story.create(sampleStory);

    console.log('\n✅ Sample story created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📖 Title: ${story.title}`);
    console.log(`🆔 Story ID: ${story._id}`);
    console.log(`👤 User: ${user.email}`);
    console.log(`🎭 Genres: ${story.genre.join(', ')}`);
    console.log(`👥 Characters: ${story.characters.join(', ')}`);
    console.log(`📸 Scenes: ${story.scenes.length}`);
    console.log(`🖼️  Cover Image: ${story.coverImage ? 'Yes' : 'No'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🧪 Test Instructions:');
    console.log('1. Start your server: npm run dev');
    console.log('2. Go to: http://localhost:3000/my-stories');
    console.log('3. Find the story: "🧪 Test Story - Delete Me!"');
    console.log('4. Click the trash icon (🗑️) to delete');
    console.log('5. Confirm deletion in the modal');
    console.log('6. Watch for the success message! ✅');
    console.log('\nNote: This story uses Unsplash placeholder images (not Cloudinary),');
    console.log('so Cloudinary deletion will be skipped, but MongoDB deletion will work!');
    console.log('\n💡 To test with Cloudinary images, create a real story with AI.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating sample story:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createSampleStory();
