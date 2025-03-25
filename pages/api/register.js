// pages/api/register.js
import dbConnect from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await dbConnect();

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role = 'user' (or rely on the default in the schema)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'user', // Explicitly set or omit if relying on model default
    });

    return res.status(201).json({
      message: 'User created',
      userId: newUser._id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
