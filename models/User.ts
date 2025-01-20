import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount: number; // Virtual property
}

const schemaOptions = {
  toJSON: { virtuals: true },
  id: false,
} as const;

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

userSchema.virtual('friendCount').get(function(this: IUser) {
  return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export type { IUser };
export default User;