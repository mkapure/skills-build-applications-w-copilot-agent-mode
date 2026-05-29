import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// GET /api/activities/
router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user', '-password');
  res.json(activities);
});

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user', '-password');
  if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
  res.json(activity);
});

// POST /api/activities/
router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

// PUT /api/activities/:id
router.put('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
  res.json(activity);
});

// DELETE /api/activities/:id
router.delete('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
  res.json({ message: 'Activity deleted' });
});

export default router;
