import { Router, Request, Response } from 'express';
import apiRoutes from './api';

const router = Router();

// API routes
router.use('/api', apiRoutes);

// Fallback route for unmatched paths
router.use((req: Request, res: Response) => {
  res.status(404).send('Wrong route!');
});

export default router;
