import { Schema, model, Types } from 'mongoose';
import { reactionSchema } from './Reaction'

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }, 
        id: false,
    }
);

// create virtual called 'reactionCount' that retrieves length of the thoughts 'reactions' array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;