import { Schema, model, Document, Types } from 'mongoose';
import { IReaction, reactionSchema } from './Reaction';
import { formatDate } from '../utils/dateFormat';

// Define the interface for Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number; // Virtual property
}

// Schema configuration
const schemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
} as const;

// Constants for validation
const TEXT_LENGTH = {
  MIN: 1,
  MAX: 280,
} as const;

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: TEXT_LENGTH.MAX,
      minlength: TEXT_LENGTH.MIN,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
      get: (timestamp: Date) => formatDate(timestamp) as any,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  schemaOptions
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
  return this.reactions.length;
});

// Create the model
const Thought = model<IThought>('Thought', thoughtSchema);

export type { IThought };  // Export the interface for use in other files
export default Thought;