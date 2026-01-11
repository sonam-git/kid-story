import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import StoryModel from '@/models/Story';
import { verifyToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // Await params in Next.js 15+
    const { id: storyId } = await params;

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    // Find the story
    const story = await StoryModel.findById(storyId);
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    // Check if user already liked the story
    const userObjectId = userId;
    const alreadyLiked = story.likes.some(
      (likeId) => likeId.toString() === userObjectId
    );

    if (alreadyLiked) {
      // Unlike: remove user from likes array
      story.likes = story.likes.filter(
        (likeId) => likeId.toString() !== userObjectId
      );
      story.likesCount = Math.max(0, story.likesCount - 1);
    } else {
      // Like: add user to likes array
      story.likes.push(userObjectId as any);
      story.likesCount = story.likesCount + 1;
    }

    await story.save();

    return NextResponse.json({
      success: true,
      liked: !alreadyLiked,
      likesCount: story.likesCount,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
