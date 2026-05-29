import { Schema, model, Types } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export const Team = model('Team', teamSchema);
