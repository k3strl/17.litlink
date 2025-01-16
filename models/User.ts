import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount: number; // Virtual property
}

// Separate schema configuration for better readability
const schemaOptions = {
  toJSON: { virtuals: true },
  id: false,
} as const;

// Separate email validation regex
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [EMAIL_REGEX, 'Please provide a valid email address'],
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  schemaOptions
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function(this: IUser) {
  return this.friends.length;
});

// Create the model
const User = model<IUser>('User', userSchema);

export type { IUser };  // Export the interface for use in other files
export default User;