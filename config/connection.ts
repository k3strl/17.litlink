import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connection options type
interface ConnectOptions extends mongoose.ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

// Connection URL (use environment variable if available, otherwise fallback to local)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/LitLink';

// Connection options
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create connection function
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;