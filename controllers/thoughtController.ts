import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

//// getAllThoughts
//// getThoughtById (opt)
// createThought
// updateThought
// deleteThought
// addReaction
// delet





// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
    try {
        const allThoughts = await Thought.find().select('-__v');
        if (!allThoughts.length) {
            res.status(404).json({ message: 'Empty brain... No thoughts by that id.' });
            return;
        }
        res.status(200).json(allThoughts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching all thoughts' });
    }
};

// Get single thought by its ID.
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
        const oneThought = await Thought.findById(req.params.thoughtId).select('-__v');
        if (!oneThought) {
            res.status(404).json({ message: 'Can\'t find that thought.' });
            return;
        }
        res.status(200).json(oneThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch thought' });
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
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).json({ message: 'Brain fart... Failed to create thought' });
    }
};

// Update an existing thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        ).select('-__v');
        if (!updatedThought) {
            res.status(404).json({ message: 'Brain empty. No thoughts found.' });
            return;
        }
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update thought' });
    }
};

// Delete a thought and remove its association with a user
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            res.status(404).json({ message: 'Brain empty. Thought not found' });
            return;
        }

        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );
        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete thought' });
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
        ).select('-__v');
        if (!updatedThought) {
            res.status(404).json({ message: 'Brain empty. No thought found with that ID.' });
            return;
        }
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add reaction' });
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
        ).select('-__v');
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with that ID.' });
            return;
        }

        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove reaction' });
    }
};
