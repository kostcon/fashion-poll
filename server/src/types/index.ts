import { Document, Types } from 'mongoose';

export interface IVotedOutfit {
  outfitId: Types.ObjectId;
  vote: boolean;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedOutfits: Types.ObjectId[];
  votedOutfits: IVotedOutfit[];
  isCorrectPassword(password: string): Promise<boolean>;
}

export interface IOutfit extends Document {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  creator: Types.ObjectId | IUser;
}

export interface AuthContext {
  user?: {
    username: string;
    email: string;
    _id: string;
  } | null;
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface UserInput extends AuthInput {
  username: string;
}

export interface OutfitInput {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface VoteInput {
  outfitId: string;
  vote: boolean;
}