import { Schema, model, Types } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const Leaderboard = model('Leaderboard', leaderboardSchema);
