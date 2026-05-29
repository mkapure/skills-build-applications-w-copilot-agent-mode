import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

// GET /api/users/
router.get('/', async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json(user);
});

// POST /api/users/
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const { password: _pw, ...safe } = user.toObject();
  res.status(201).json(safe);
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json(user);
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json({ message: 'User deleted' });
});

export default router;
