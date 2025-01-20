import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Thought, User, IThought } from '../models';

class ThoughtError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ThoughtError';
  }
}

interface CreateThoughtPayload {
  thoughtText: string;
  username: string;
  userId: Types.ObjectId;
}

const handleControllerError = (error: unknown, res: Response): void => {
  if (error instanceof ThoughtError) {
    res.status(error.statusCode).json({ message: error.message });
    return;  
  }
  res.status(500).json({ message: 'Internal server error' });
};

export const getAllThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find().select('-__v');
    if (!thoughts.length) {
      throw new ThoughtError(404, 'No thoughts found');
    }
    res.status(200).json(thoughts);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).select('-__v');
    if (!thought) {
      throw new ThoughtError(404, 'Thought not found');
    }
    res.status(200).json(thought);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createThought = async (req: Request<{}, {}, CreateThoughtPayload>, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    const newThought = await Thought.create({ thoughtText, username });
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!updatedUser) {
      await Thought.findByIdAndDelete(newThought._id);
      throw new ThoughtError(404, 'User not found');
    }

    res.status(201).json(newThought);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedThought) {
      throw new ThoughtError(404, 'Thought not found');
    }

    res.status(200).json(updatedThought);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      throw new ThoughtError(404, 'Thought not found');
    }

    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedThought) {
      throw new ThoughtError(404, 'Thought not found');
    }

    res.status(200).json(updatedThought);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtId, reactionId } = req.params;
    
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    ).select('-__v');

    if (!updatedThought) {
      throw new ThoughtError(404, 'Thought not found');
    }

    res.status(200).json(updatedThought);
  } catch (error) {
    handleControllerError(error, res);
  }
};