import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/LitLink');

module.exports = mongoose.connection;