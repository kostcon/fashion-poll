import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VOTE_OUTFIT, SAVE_OUTFIT, REMOVE_OUTFIT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Outfit, VoteOutfitResponse, SaveOutfitResponse, RemoveOutfitResponse } from '../../types';

interface OutfitCardProps {
  outfit: Outfit;
  saved?: boolean;
  showVoteButtons?: boolean;
  onSave?: () => void;
  onRemove?: () => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ 
  outfit, 
  saved = false, 
  showVoteButtons = true,
  onSave,
  onRemove 
}) => {
  const [voteOutfit] = useMutation<VoteOutfitResponse>(VOTE_OUTFIT);
  const [saveOutfit] = useMutation<SaveOutfitResponse>(SAVE_OUTFIT);
  const [removeOutfit] = useMutation<RemoveOutfitResponse>(REMOVE_OUTFIT);

  const handleVote = async (vote: boolean) => {
    try {
      await voteOutfit({
        variables: { outfitId: outfit._id, vote },
      });
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const handleSaveOutfit = async () => {
    if (!Auth.loggedIn()) {
      return alert('You need to be logged in to save outfits!');
    }

    try {
      await saveOutfit({
        variables: { outfitId: outfit._id },
      });
      if (onSave) onSave();
    } catch (err) {
      console.error('Error saving outfit:', err);
    }
  };

  const handleRemoveOutfit = async () => {
    if (!Auth.loggedIn()) return;

    try {
      await removeOutfit({
        variables: { outfitId: outfit._id },
      });
      if (onRemove) onRemove();
    } catch (err) {
      console.error('Error removing outfit:', err);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header bg-primary text-light p-2">
        <Link to={`/outfit/${outfit._id}`} className="text-light">
          <h3 className="m-0">{outfit.name}</h3>
        </Link>
        <p className="m-0">Category: {outfit.category}</p>
      </div>
      <div className="card-body">
        <img
          src={outfit.imageUrl}
          alt={outfit.name}
          className="img-fluid mb-3"
          style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
        />
        <p>{outfit.description}</p>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="badge bg-success me-2">👍 {outfit.upvotes}</span>
            <span className="badge bg-danger">👎 {outfit.downvotes}</span>
          </div>
          
          {Auth.loggedIn() && showVoteButtons && (
            <div>
              <button 
                className="btn btn-sm btn-success me-2" 
                onClick={() => handleVote(true)}
              >
                Vote Up
              </button>
              <button 
                className="btn btn-sm btn-danger" 
                onClick={() => handleVote(false)}
              >
                Vote Down
              </button>
            </div>
          )}
        </div>
        
        {Auth.loggedIn() && !saved && (
          <button 
            className="btn btn-info btn-block" 
            onClick={handleSaveOutfit}
          >
            Save This Outfit
          </button>
        )}
        
        {Auth.loggedIn() && saved && (
          <button 
            className="btn btn-danger btn-block" 
            onClick={handleRemoveOutfit}
          >
            Remove This Outfit
          </button>
        )}
      </div>
    </div>
  );
};

export default OutfitCard;