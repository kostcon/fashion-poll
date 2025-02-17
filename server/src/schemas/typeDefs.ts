import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedOutfits: [Outfit]
    votedOutfits: [VotedOutfit]
  }

  type VotedOutfit {
    outfitId: ID!
    vote: Boolean!
  }

  type Outfit {
    _id: ID!
    name: String!
    description: String!
    imageUrl: String!
    category: String!
    createdAt: String!
    upvotes: Int!
    downvotes: Int!
    creator: User
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    outfits(category: String): [Outfit]
    outfit(_id: ID!): Outfit
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveOutfit(outfitId: ID!): User
    removeOutfit(outfitId: ID!): User
    createOutfit(name: String!, description: String!, imageUrl: String!, category: String!): Outfit
    voteOutfit(outfitId: ID!, vote: Boolean!): Outfit
  }
`;

export default typeDefs;