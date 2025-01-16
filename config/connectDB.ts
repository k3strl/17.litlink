// focuses only on establishing a connection
import mongoose from 'mongoose';

const connectDB = async (uri: string): Promise<void> => {
  try {
    // Simplified connection logic
    await mongoose.connect(uri);
    console.log(`🌍 Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB at ${uri}:`, error);
    throw error; // Let the calling function handle the error
  }
};

export default connectDB;
