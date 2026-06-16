import { Router } from 'express';
import { query } from '../config/postgres.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ error: 'Failed to fetch trips.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tripResult = await query(
      'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    const itinerariesResult = await query(
      'SELECT * FROM itineraries WHERE trip_id = $1 ORDER BY day_number, start_time',
      [id]
    );

    res.json({
      ...tripResult.rows[0],
      itineraries: itinerariesResult.rows,
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ error: 'Failed to fetch trip.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, totalBudget } = req.body;
    const result = await query(
      `INSERT INTO trips (user_id, title, destination, start_date, end_date, total_budget)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, title, destination, startDate, endDate, totalBudget]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ error: 'Failed to create trip.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, destination, startDate, endDate, totalBudget, status } = req.body;
    const result = await query(
      `UPDATE trips SET title = COALESCE($1, title), destination = COALESCE($2, destination),
       start_date = COALESCE($3, start_date), end_date = COALESCE($4, end_date),
       total_budget = COALESCE($5, total_budget), status = COALESCE($6, status),
       updated_at = NOW()
       WHERE id = $7 AND user_id = $8 RETURNING *`,
      [title, destination, startDate, endDate, totalBudget, status, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ error: 'Failed to update trip.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    res.json({ message: 'Trip deleted successfully.' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ error: 'Failed to delete trip.' });
  }
});

export default router;
