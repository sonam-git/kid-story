import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/models/Story';

/**
 * GET /api/stories - Get all stories for the authenticated user
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    const stories = await StoryModel.find({ userId: currentUser.userId })
      .sort({ createdAt: -1 })
      .lean();

    // Transform MongoDB documents to match frontend Story type
    const transformedStories = stories.map((story) => ({
      id: story._id.toString(),
      title: story.title,
      genre: story.genre,
      characters: story.characters,
      description: story.description,
      scenes: story.scenes,
      coverImage: story.coverImage,
      createdAt: story.createdAt.toISOString(),
    }));

    return NextResponse.json(
      {
        success: true,
        stories: transformedStories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get stories error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get stories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stories - Create a new story
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, genre, characters, description, scenes, coverImage } = body;

    // Validation
    if (!title || !genre || !characters || !description || !scenes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create story
    const story = await StoryModel.create({
      userId: currentUser.userId,
      title,
      genre,
      characters,
      description,
      scenes,
      coverImage,
    });

    // Transform to match frontend type
    const transformedStory = {
      id: story._id.toString(),
      title: story.title,
      genre: story.genre,
      characters: story.characters,
      description: story.description,
      scenes: story.scenes,
      coverImage: story.coverImage,
      createdAt: story.createdAt.toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        story: transformedStory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create story error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create story' },
      { status: 500 }
    );
  }
}
