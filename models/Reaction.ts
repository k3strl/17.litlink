import { Schema, Types, Document } from 'mongoose';

// Define interface for Reaction subdocument
interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Constants for validation
const REACTION_LENGTH = {
  MAX: 280,
} as const;

// Schema configuration
const schemaOptions = {
  _id: false, // Prevents creation of additional _id field since we're using reactionId
  timestamps: true,
} as const;

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: REACTION_LENGTH.MAX,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
  },
  schemaOptions
);

export type { IReaction };  // Export the interface for use in other files
export { reactionSchema };