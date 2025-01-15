import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/api'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


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

// Start server
app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

