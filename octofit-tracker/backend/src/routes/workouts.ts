import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// GET /api/workouts/
router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) { res.status(404).json({ error: 'Workout not found' }); return; }
  res.json(workout);
});

// POST /api/workouts/
router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

// PUT /api/workouts/:id
router.put('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) { res.status(404).json({ error: 'Workout not found' }); return; }
  res.json(workout);
});

// DELETE /api/workouts/:id
router.delete('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) { res.status(404).json({ error: 'Workout not found' }); return; }
  res.json({ message: 'Workout deleted' });
});

export default router;
