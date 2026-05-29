import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { MONGODB_URI, connectToDatabase } from './config/database.js';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', async (_req, res) => {
  const mongoState = mongoose.connection.readyState;
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl,
    port: PORT,
    mongodb: {
      uri: MONGODB_URI,
      port: 27017,
      state: mongoState,
    },
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`OctoFit backend listening on port ${PORT}`);
    console.log(`Base URL: ${baseUrl}`);
  });
}

void startServer();
