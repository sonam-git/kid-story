import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import StoryModel from '@/models/Story';
import mongoose from 'mongoose';

/**
 * GET /api/stories/[id] - Get a single story by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const story = await StoryModel.findOne({
      _id: id,
      userId: currentUser.userId,
    }).lean();

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

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
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get story error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get story' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/stories/[id] - Update a story
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { title, genre, characters, description, scenes, coverImage } = body;

    await connectDB();

    // Update story (only if it belongs to the current user)
    const story = await StoryModel.findOneAndUpdate(
      {
        _id: id,
        userId: currentUser.userId,
      },
      {
        title,
        genre,
        characters,
        description,
        scenes,
        coverImage,
      },
      { new: true, runValidators: true }
    );

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

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
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update story error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update story' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/stories/[id] - Delete a story
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    await connectDB();

    // Delete story (only if it belongs to the current user)
    const story = await StoryModel.findOneAndDelete({
      _id: id,
      userId: currentUser.userId,
    });

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Story deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete story error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete story' },
      { status: 500 }
    );
  }
}
