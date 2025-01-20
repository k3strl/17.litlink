import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { User, Thought, IUser } from '../models';

class UserError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'UserError';
  }
}

interface UserPayload {
  username: string;
  email: string;
}

const handleControllerError = (error: unknown, res: Response): void => {
  if (error instanceof UserError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  res.status(500).json({ message: 'Internal server error' });
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v');

    if (!users.length) {
      throw new UserError(404, 'No users found');
    }
    
    res.status(200).json(users);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .select('-__v');

    if (!user) {
      throw new UserError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createUser = async (req: Request<{}, {}, UserPayload>, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateUser = async (req: Request<{ id: string }, {}, UserPayload>, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedUser) {
      throw new UserError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new UserError(404, 'User not found');
    }

    await Thought.deleteMany({ username: user.username });
    await user.deleteOne();
    
    res.status(200).json({ 
      message: 'User and associated thoughts deleted successfully' 
    });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const friendExists = await User.findById(friendId);
    if (!friendExists) {
      throw new UserError(404, 'Friend not found');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).populate('friends').select('-__v');

    if (!updatedUser) {
      throw new UserError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    ).populate('friends').select('-__v');

    if (!updatedUser) {
      throw new UserError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleControllerError(error, res);
  }
};