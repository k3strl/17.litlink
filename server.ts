import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI!, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

// Main entry point