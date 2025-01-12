import { Schema, model, Types } from 'mongoose';

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt {
            //!Date
            //!Set default value to the current timestamp
            //!Use a getter method to format timestamp on query
        },
        username {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);
