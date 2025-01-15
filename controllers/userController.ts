import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

//// getAllUsers
//// getUserById
//// createUser
//// updateUser
//// deleteUser
//// addFriend
//// removeFriend


// Get complete list of users.
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Should return a list of all users, plus all thought and friend data.
        const allUsers = await User.find()
            .populate('thoughts')
            .populate('friends');
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching all users.' });
    }
};

// Find one specific user by ID.
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Should find one user by ID, plus all thought & friend data connected to that user.
        const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Could not find user.' });
    }
};

// Create a user.
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error creating user.' });
    }
};

// Update an existing user.
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            // Return the updated document and run validation
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Delete an existing user.
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await User.findById(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        // BONUS: Remove user's associated thoughts
        await Thought.deleteMany({ username: deletedUser.username });

        await deletedUser.deleteOne();
        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete user. Go pick on someone else." });
    }
};


// Add another user as a friend.
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const addedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!addedFriend) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(addedFriend);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add friend. Sad day.' });
    }
};

// Remove someone from user's friend list.
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const removedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!removedFriend) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(removedFriend);
    } catch (err) {
        res.status(400).json(err);
    }
};