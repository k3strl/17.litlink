// server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'; // Import mongoose for clean shutdown
import dotenv from 'dotenv';
import connectDB from './config/connectDB';
import routes from './routes';

dotenv.config();

// Validate and type environment variables
const PORT: number = parseInt(process.env.PORT || '3001', 10);
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/litlink';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in the environment variables.');
}

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

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

// Global error handling for uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

// Error handling middleware
app.use((err: Error | unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error('❌ Unexpected middleware error:', err);
  res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected middleware error occurred' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  await connectDB(MONGODB_URI);
});
