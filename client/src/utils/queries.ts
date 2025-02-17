import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedOutfits {
        _id
        name
        description
        imageUrl
        category
        upvotes
        downvotes
      }
      votedOutfits {
        outfitId
        vote
      }
    }
  }
`;

export const QUERY_OUTFITS = gql`
  query getOutfits($category: String) {
    outfits(category: $category) {
      _id
      name
      description
      imageUrl
      category
      createdAt
      upvotes
      downvotes
      creator {
        _id
        username
      }
    }
  }
`;

export const QUERY_SINGLE_OUTFIT = gql`
  query getSingleOutfit($outfitId: ID!) {
    outfit(_id: $outfitId) {
      _id
      name
      description
      imageUrl
      category
      createdAt
      upvotes
      downvotes
      creator {
        _id
        username
      }
    }
  }
`;