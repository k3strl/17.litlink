import { Router } from 'express';
import {
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../controllers/thoughtController';

const router = Router();

// Fetch all thoughts
router.get('/', getAllThoughts);

// Create a new thought and attatch it to a userID
router.post('/:userId', createThought);

// Update a specific thought by thoughtId
router.put('/:thoughtId', updateThought);

// Delete a specific thought by thoughtId
router.delete('/:thoughtId', deleteThought);

// Add a reaction to a specific thought by thoughtId
router.post('/:thoughtId/reactions', addReaction);

// Delete a reaction from a specific thought by thoughtId and reactionId
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
