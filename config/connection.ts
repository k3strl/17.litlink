import mongoose from 'mongoose';

// double check this address (after the IP address)
mongoose.connect('mongodb://127.0.0.1.27017/LitLink');

module.exports = mongoose.connection;