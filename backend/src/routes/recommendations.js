import { Router } from 'express';
import { query } from '../config/postgres.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/user', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM recommendations
       WHERE user_id = $1 AND is_dismissed = FALSE
       ORDER BY score DESC LIMIT 10`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
});

router.get('/destination/:destination', async (req, res) => {
  try {
    const { destination } = req.params;
    const result = await query(
      `SELECT r.*, u.name as user_name
       FROM recommendations r
       JOIN users u ON r.user_id = u.id
       WHERE LOWER(r.destination) = LOWER($1)
       ORDER BY r.score DESC LIMIT 20`,
      [destination]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get destination recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
});

router.post('/dismiss/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await query(
      'UPDATE recommendations SET is_dismissed = TRUE WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    res.json({ message: 'Recommendation dismissed.' });
  } catch (error) {
    console.error('Dismiss recommendation error:', error);
    res.status(500).json({ error: 'Failed to dismiss recommendation.' });
  }
});

export default router;
