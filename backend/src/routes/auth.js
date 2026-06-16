import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/postgres.js';
import { authenticate, generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, passwordHash]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const { password_hash, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login.' });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, budget, travel_style, preferences, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

export default router;
