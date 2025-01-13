import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
    try {
        // fetches all thoughts and return in JSON format, 500 if error
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch thoughts', details: err.message });
    }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
    const { params, body } = req;
    try {
      // Create the thought
      const newThought = await Thought.create(body);
  
      // Attach the thought to the user by ID
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
      res.status(500).json({ message: 'Failed to create thought', error: err });
    }
  };

export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        // update thought by _id, updates with provided data, 404 if error
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the thought', details: err.message });
    }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        // find thought by _id and delete it (404 if error)
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

        if (!deletedThought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }

        // Remove the thought ID from the user's thoughts array (500 if error)
        await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, {
            $pull: {
                thoughts: req.params.thoughtId
            }
        });

        res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the thought', details: err.message });
    }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        // add a reaction to a thought
    }
}

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        // remove a reaction from a thought
    }
}
