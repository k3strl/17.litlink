// centralizes connection state management and utilizes the reusable connectDB utility
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './connectDB';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/LitLink';

const connectDefaultDB = async (): Promise<void> => {
  try {
    await connectDB(MONGODB_URI); // Use the utility function for connection
    console.log('MongoDB connected successfully to the default URI.');

    // Manage connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
    });

    // Handle process termination for global state
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination.');
      process.exit(0);
    });
  } catch (error) {
    console.error('MongoDB connection error in default connection:', error);
    process.exit(1);
  }
};

export { connectDefaultDB, mongoose };
