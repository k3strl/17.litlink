import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';

const router = Router();

router.route('/').get(getAllUsers).post(createUser);

export default router;