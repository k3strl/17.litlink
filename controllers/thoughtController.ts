import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// getAllThoughts
// createThought
// updateThought
// deleteThought





// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
    try {
        const thoughts = await Thought.find().select('-__v'); // Exclude `__v` field
        if (!thoughts.length) {
            res.status(404).json({ message: 'No thoughts found' });
            return;
        }
        res.status(200).json(thoughts);
    } catch (err) {
        console.error(`[ERROR] Failed to fetch thoughts: ${err.message}`);
        res.status(500).json({ message: 'Failed to fetch thoughts', error: err.message });
    }
};

// Create a new thought and associate it with a user
export const createThought = async (req: Request, res: Response): Promise<void> => {
    const { params, body } = req;
    try {
        const newThought = await Thought.create(body);
        const updatedUser = await User.findByIdAndUpdate(
            params.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }

        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create thought', error: err.message });
    }
};

// Update an existing thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }

        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update thought', error: err.message });
    }
};

// Delete a thought and remove its association with a user
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

        if (!deletedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }

        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );

        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete thought', error: err.message });
    }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { thoughtId } = req.params;
        const reaction = req.body;

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: reaction } },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }

        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add reaction', error: err.message });
    }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { thoughtId, reactionId } = req.params;

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }

        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove reaction', error: err.message });
    }
};
