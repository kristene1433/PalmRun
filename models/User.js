import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Default role = 'user'. You can manually set 'owner' in the DB later.
  role: { type: String, default: 'user' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
