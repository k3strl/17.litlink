import { Schema, Types, Document } from 'mongoose';
import { formatDate } from '../utils/dateFormat';

// Define interface for Reaction subdocument
interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Constants for validation
const REACTION_MAX_LENGTH = 280;

// Schema configuration
const schemaOptions = {
  _id: false, // Prevents creation of an additional _id field since we're using reactionId
  toJSON: {
    getters: true, // Ensure getters are applied when converting to JSON
  },
} as const;

// Reaction schema definition
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: REACTION_MAX_LENGTH,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date, // Use Schema.Types.Date for better typing compatibility
      default: Date.now,
      get: (timestamp: Date) => formatDate(timestamp) as any, // Ensure the getter is correctly typed
    },
  },
  schemaOptions
);

// Export the schema and interface
export type { IReaction };
export { reactionSchema };