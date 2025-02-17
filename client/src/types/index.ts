export interface Outfit {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    creator?: User;
  }
  
  export interface VotedOutfit {
    outfitId: string;
    vote: boolean;
  }
  
  export interface User {
    _id: string;
    username: string;
    email?: string;
    savedOutfits?: Outfit[];
    votedOutfits?: VotedOutfit[];
  }
  
  export interface Auth {
    token: string;
    user: User;
  }
  
  export interface FormState {
    username?: string;
    email: string;
    password: string;
  }
  
  export interface OutfitFormState {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
  }
  
  export interface AuthResponse {
    login?: Auth;
    addUser?: Auth;
  }
  
  export interface MeResponse {
    me: User;
  }
  
  export interface OutfitsResponse {
    outfits: Outfit[];
  }
  
  export interface OutfitResponse {
    outfit: Outfit;
  }
  
  export interface SaveOutfitResponse {
    saveOutfit: User;
  }
  
  export interface RemoveOutfitResponse {
    removeOutfit: User;
  }
  
  export interface VoteOutfitResponse {
    voteOutfit: Outfit;
  }