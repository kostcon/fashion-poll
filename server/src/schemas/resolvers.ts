import { AuthenticationError } from 'apollo-server-express';
import { User, Outfit } from '../models';
import { signToken } from '../utils/auth';
import { IUser, IOutfit, AuthContext, UserInput, AuthInput, OutfitInput, VoteInput } from '../types';

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: AuthContext) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedOutfits');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().select('-__v -password').populate('savedOutfits');
    },
    user: async (_: any, { username }: { username: string }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('savedOutfits');
    },
    outfits: async (_: any, { category }: { category?: string }) => {
      const params = category ? { category } : {};
      return Outfit.find(params).populate('creator');
    },
    outfit: async (_: any, { _id }: { _id: string }) => {
      return Outfit.findOne({ _id }).populate('creator');
    },
  },

  Mutation: {
    addUser: async (_: any, args: UserInput) => {
      const user = await User.create(args);
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });
      return { token, user };
    },
    login: async (_: any, { email, password }: AuthInput) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });
      return { token, user };
    },
    saveOutfit: async (_: any, { outfitId }: { outfitId: string }, context: AuthContext) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedOutfits: outfitId } },
          { new: true }
        ).populate('savedOutfits');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeOutfit: async (_: any, { outfitId }: { outfitId: string }, context: AuthContext) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedOutfits: outfitId } },
          { new: true }
        ).populate('savedOutfits');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createOutfit: async (_: any, args: OutfitInput, context: AuthContext) => {
      if (context.user) {
        const outfit = await Outfit.create({
          ...args,
          creator: context.user._id,
        });

        return outfit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    voteOutfit: async (_: any, { outfitId, vote }: VoteInput, context: AuthContext) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        
        if (!user) {
          throw new AuthenticationError('User not found');
        }
        
        // Check if user has already voted for this outfit
        const existingVoteIndex = user.votedOutfits.findIndex(
          (item) => item.outfitId.toString() === outfitId
        );

        let previousVote = null;
        if (existingVoteIndex > -1) {
          previousVote = user.votedOutfits[existingVoteIndex].vote;
          user.votedOutfits[existingVoteIndex].vote = vote;
        } else {
          user.votedOutfits.push({ outfitId, vote });
        }

        await user.save();

        // Update outfit votes
        const outfit = await Outfit.findById(outfitId);
        
        if (!outfit) {
          throw new Error('Outfit not found');
        }

        // If there was a previous vote and it's different from the new vote
        if (previousVote !== null && previousVote !== vote) {
          if (previousVote === true) {
            outfit.upvotes -= 1;
          } else {
            outfit.downvotes -= 1;
          }
        }

        // Add the new vote
        if (previousVote !== vote) {
          if (vote === true) {
            outfit.upvotes += 1;
          } else {
            outfit.downvotes += 1;
          }
        }

        await outfit.save();
        return outfit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;