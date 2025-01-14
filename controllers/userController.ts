import { Request, Response } from 'express';
import User from '../models/User';

//// getAllUsers
//// getUserById
//// createUser
//// updateUser
//// deleteUser
// addFriend
// removeFriend


// Get complete list of users.
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ 'Error fetching all users.' });
    }
};

// Find one specific user by ID.
export const getUserById = async (req, res) => {
    try {
        // Should find one user by ID and populate all thought & friend data
        const user = await User.findOne().populate('thoughts').populate('friends'); 
        res.json(user);
    } catch (err) {
        res.status(500).json({ 'Could not find user.' });
    }
}

// Create a user.
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ 'Error creating user.' });
    }
};

// Update an existing user.
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params; // Assuming the user ID is passed as a route parameter
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error); // Optional for debugging
    res.status(500).json({ message: "Error updating user." });
  }
};
 

// Delete an existing user.
// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { userId } = req.params; // Assuming the user ID is passed in the route parameters
//       const deletedUser = await User.findByIdAndDelete(userId);
  
//       if (!deletedUser) {
//         res.status(404).json({ message: "No user found with that ID" });
//         return;
//       }
  
//       res.json({ message: "User deleted successfully", deletedUser });
//     } catch (error) {
//       console.error("Error deleting user:", error); // Optional for debugging
//       res.status(500).json({ message: "Failed to delete user. Go pick on someone else." });
//     }
//   };

// Add another user as a friend.
// export const addFriend = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { userId, friendId } = req.params;
  
//       const user = await User.findByIdAndUpdate(
//         { _id: userId },
//         { $addToSet: { friends: friendId } },
//         { new: true }
//       );
  
//       if (!user) {
//         res.status(404).json({ message: "No user with that ID" });
//         return;
//       }
  
//       res.json({ message: "Friend added!", user });
//     } catch (error) {
//       console.error("Error adding friend:", error); // Optional for debugging
//       res.status(500).json({ message: "Failed to add friend" });
//     }
//   };

// Remove someone from user's friend list.
export const removeFriend = async (req, res) => {
    try {
        const updatedUser = await User.create(req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ 'Failed to remove user as a friend. You\'re stuck with them I guess.' });
    }
}; 




// gippity
