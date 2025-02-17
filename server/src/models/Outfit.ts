import { Schema, model } from 'mongoose';
import { IOutfit } from '../types';

const outfitSchema = new Schema<IOutfit>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Casual', 'Formal', 'Sportswear', 'Evening', 'Beach', 'Winter'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Outfit = model<IOutfit>('Outfit', outfitSchema);

export default Outfit;