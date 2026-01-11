import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/models/Story';

/**
 * POST /api/stories/create-sample - Create a sample test story
 * This endpoint creates a test story with placeholder images for testing delete functionality
 */
export async function POST() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    // Sample story data with placeholder images from Unsplash
    const sampleStory = {
      userId: currentUser.userId,
      title: "🧪 Test Story - Delete Me!",
      genre: ["Adventure", "Fantasy"],
      characters: ["Bobby the Bear", "Lucy the Lion"],
      description: "This is a test story created for testing the delete functionality. Feel free to delete this!",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop",
      scenes: [
        {
          id: "scene-1",
          text: "Once upon a time, Bobby the Bear woke up in a magical forest. The sun was shining through the tall trees!",
          imagePrompt: "A friendly bear waking up in a beautiful forest with sunlight",
          imageUrl: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=800&h=600&fit=crop"
        },
        {
          id: "scene-2",
          text: "Bobby met Lucy the Lion near a sparkling river. She was playing with colorful butterflies.",
          imagePrompt: "A lion playing with butterflies near a river",
          imageUrl: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=800&h=600&fit=crop"
        },
        {
          id: "scene-3",
          text: "Together, they discovered a hidden treasure chest filled with golden stars and magical crystals!",
          imagePrompt: "A treasure chest with stars and crystals",
          imageUrl: "https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800&h=600&fit=crop"
        },
        {
          id: "scene-4",
          text: "Bobby and Lucy became best friends and promised to have more adventures together. The End!",
          imagePrompt: "Two friends together in a beautiful sunset",
          imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
        }
      ],
      likes: [],
      likesCount: 0,
    };

    const story = await StoryModel.create(sampleStory);

    return NextResponse.json(
      {
        success: true,
        message: 'Sample test story created successfully!',
        story: {
          id: story._id.toString(),
          title: story.title,
          genre: story.genre,
          characters: story.characters,
          description: story.description,
          coverImage: story.coverImage,
          scenes: story.scenes,
          likesCount: story.likesCount,
          createdAt: story.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create sample story error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create sample story' },
      { status: 500 }
    );
  }
}
