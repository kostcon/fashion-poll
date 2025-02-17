import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedOutfits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Outfit',
    },
  ],
  votedOutfits: [
    {
      outfitId: {
        type: Schema.Types.ObjectId,
        ref: 'Outfit',
      },
      vote: {
        type: Boolean, // true for like, false for dislike
        required: true,
      },
    },
  ],
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password
userSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;