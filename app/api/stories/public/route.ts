import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/models/Story';

/**
 * GET /api/stories/public - Get all stories from other users (excluding current user's stories)
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

    // Fetch all stories EXCEPT the current user's stories
    const stories = await StoryModel.find({ userId: { $ne: currentUser.userId } })
      .sort({ createdAt: -1 })
      .lean();

    // Transform MongoDB documents to match frontend Story type
    const transformedStories = stories.map((story) => ({
      id: story._id.toString(),
      userId: story.userId.toString(),
      title: story.title,
      genre: story.genre,
      characters: story.characters,
      description: story.description,
      scenes: story.scenes,
      coverImage: story.coverImage,
      likes: story.likes?.map((id: any) => id.toString()) || [],
      likesCount: story.likesCount || 0,
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
    console.error('Get public stories error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get public stories' },
      { status: 500 }
    );
  }
}
