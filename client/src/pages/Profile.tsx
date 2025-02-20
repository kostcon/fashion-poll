import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import OutfitCard from '../components/header/OutfitCard';
import OutfitForm from '../components/header/OutfitForm';
import Auth from '../utils/auth';
import { MeResponse } from '../types';

const Profile: React.FC = () => {
  const { loading, data, refetch } = useQuery<MeResponse>(QUERY_ME);

  // If not logged in, redirect to login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.me;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="mb-4">Welcome, {user?.username}!</h2>
          <OutfitForm />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3>Your Saved Outfits</h3>
          {user?.savedOutfits?.length === 0 ? (
            <p>No saved outfits yet!</p>
          ) : (
            <div className="outfits-container">
              {user?.savedOutfits?.map((outfit) => (
                <OutfitCard
                  key={outfit._id}
                  outfit={outfit}
                  saved={true}
                  showVoteButtons={true}
                  onRemove={() => refetch()}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;