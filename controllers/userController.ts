import { Request, Response } from 'express';
import User from '../models/User';

// getAllUsers
// getUserById
// createUser
// updateUser
// deleteUser
// addFriend
// removeFriend


// Get complete list of users.
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        // OR, User.find().populate('thoughts').populate('friends'); would also populate related thoughts and friends.
        //! Test this later if time allows
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ 'Failed to fetch users.' });
    }
};

// Find one specific user by ID.
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne();
        res.json(user);
    } catch (err) {
        res.status(500).json({ 'Failed to find user.' })
    }
}

// Create a user.
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.create(req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}; 