import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_OUTFIT = gql`
  mutation saveOutfit($outfitId: ID!) {
    saveOutfit(outfitId: $outfitId) {
      _id
      username
      savedOutfits {
        _id
        name
        description
        imageUrl
        category
      }
    }
  }
`;

export const REMOVE_OUTFIT = gql`
  mutation removeOutfit($outfitId: ID!) {
    removeOutfit(outfitId: $outfitId) {
      _id
      username
      savedOutfits {
        _id
        name
        description
        imageUrl
        category
      }
    }
  }
`;

export const CREATE_OUTFIT = gql`
  mutation createOutfit($name: String!, $description: String!, $imageUrl: String!, $category: String!) {
    createOutfit(name: $name, description: $description, imageUrl: $imageUrl, category: $category) {
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

export const VOTE_OUTFIT = gql`
  mutation voteOutfit($outfitId: ID!, $vote: Boolean!) {
    voteOutfit(outfitId: $outfitId, vote: $vote) {
      _id
      upvotes
      downvotes
    }
  }
`;