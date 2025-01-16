import express from 'express';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/api'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/litlink';


// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('🌍 Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// "Graceful shutdown" ensures MongoDB connectionjs are properly closed when server is terminated
process.on('SIGINT', async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});


// Start server
app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

