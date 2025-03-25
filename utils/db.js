// utils/db.js

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env.local');
}

/**
 * A cached connection across hot reloads in dev mode to avoid
 * creating multiple connections unnecessarily.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If already connected, just return it
  if (cached.conn) {
    return cached.conn;
  }

  // If not cached yet, create a connection promise
  if (!cached.promise) {
    const opts = {
      // Common Mongoose config for Mongoose 7+
      autoIndex: true,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Wait for the connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
