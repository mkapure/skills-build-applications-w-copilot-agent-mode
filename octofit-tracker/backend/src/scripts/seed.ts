import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { username: 'alexrunner', email: 'alex@example.com', password: 'pass1234' },
    { username: 'mariafit', email: 'maria@example.com', password: 'pass1234' },
    { username: 'diegolifts', email: 'diego@example.com', password: 'pass1234' },
    { username: 'sarahcycle', email: 'sarah@example.com', password: 'pass1234' },
    { username: 'liamyoga', email: 'liam@example.com', password: 'pass1234' },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Morning Striders',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Strength Crew',
      members: [users[2]._id, users[3]._id, users[4]._id],
    },
  ]);

  const now = new Date();
  await Activity.insertMany([
    { user: users[0]._id, type: 'Running', duration: 42, date: new Date(now.getTime() - 86400000) },
    { user: users[1]._id, type: 'HIIT', duration: 35, date: new Date(now.getTime() - 2 * 86400000) },
    { user: users[2]._id, type: 'Weightlifting', duration: 55, date: new Date(now.getTime() - 3 * 86400000) },
    { user: users[3]._id, type: 'Cycling', duration: 60, date: new Date(now.getTime() - 4 * 86400000) },
    { user: users[4]._id, type: 'Yoga', duration: 40, date: new Date(now.getTime() - 5 * 86400000) },
    { user: users[0]._id, type: 'Core Training', duration: 25, date: new Date(now.getTime() - 6 * 86400000) },
  ]);

  await Leaderboard.insertMany([
    { user: users[2]._id, score: 970 },
    { user: users[3]._id, score: 910 },
    { user: users[0]._id, score: 880 },
    { user: users[1]._id, score: 845 },
    { user: users[4]._id, score: 810 },
  ]);

  await Workout.insertMany([
    {
      name: 'Runner Endurance Set',
      description: 'Build aerobic endurance with interval progression.',
      exercises: ['5km easy run', '6 x 400m intervals', '10 min cooldown walk'],
    },
    {
      name: 'Upper Body Power',
      description: 'Focused strength workout for chest, shoulders, and triceps.',
      exercises: ['Bench press 4x6', 'Shoulder press 3x8', 'Dips 3x12'],
    },
    {
      name: 'Mobility and Recovery Flow',
      description: 'Low-impact flexibility routine for recovery days.',
      exercises: ['Sun salutation x5', 'Hip opener flow 12 min', 'Breathing cooldown 8 min'],
    },
  ]);

  console.log('Seed completed successfully.');
  console.log(`Inserted users: ${users.length}`);
  console.log(`Inserted teams: ${teams.length}`);

  await mongoose.disconnect();
}

seedDatabase().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
