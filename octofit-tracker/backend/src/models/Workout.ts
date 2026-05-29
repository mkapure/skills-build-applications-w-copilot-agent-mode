import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ type: String }],
}, { timestamps: true });

export const Workout = model('Workout', workoutSchema);
