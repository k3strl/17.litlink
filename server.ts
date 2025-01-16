import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/api';
import connectDB from './config/connection';

// Load environment variables
dotenv.config();

// Validate and type environment variables
const PORT: number = parseInt(process.env.PORT || '3001', 10);
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/litlink';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in the environment variables.');
}

const app: Application = express();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('🌍 Connected to MongoDB'))
  .catch((err: unknown) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Clean shutdown function
const cleanShutdown = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection successfully closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
};

// Handle SIGINT and SIGTERM for clean shutdown
process.on('SIGINT', cleanShutdown);
process.on('SIGTERM', cleanShutdown);

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error('❌ Unexpected error:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
