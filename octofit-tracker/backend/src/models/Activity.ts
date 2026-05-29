import { Schema, model, Types } from 'mongoose';

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Activity = model('Activity', activitySchema);
