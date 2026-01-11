import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IScene {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface IStory extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  genre: string[];
  characters: string[];
  description: string;
  scenes: IScene[];
  coverImage?: string;
  likes: mongoose.Types.ObjectId[];
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const sceneSchema = new Schema<IScene>(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imagePrompt: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { _id: false }
);

const storySchema = new Schema<IStory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Story title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    genre: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'At least one genre is required',
      },
    },
    characters: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'At least one character is required',
      },
    },
    description: {
      type: String,
      required: [true, 'Story description is required'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    scenes: {
      type: [sceneSchema],
      required: true,
    },
    coverImage: {
      type: String,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
storySchema.index({ userId: 1, createdAt: -1 });

const StoryModel: Model<IStory> =
  mongoose.models.Story || mongoose.model<IStory>('Story', storySchema);

export default StoryModel;
