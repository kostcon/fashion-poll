import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_OUTFIT } from '../utils/queries';
import OutfitCard from '../components/header/OutfitCard';
import { OutfitResponse } from '../types';

const OutfitDetail: React.FC = () => {
  const { outfitId } = useParams<{ outfitId: string }>();

  const { loading, error, data } = useQuery<OutfitResponse>(QUERY_SINGLE_OUTFIT, {
    variables: { outfitId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.outfit) return <div>Outfit not found</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <OutfitCard
            outfit={data.outfit}
            showVoteButtons={true}
          />
          
          <div className="card mb-3">
            <div className="card-body">
              <h4>Created by: {data.outfit.creator?.username}</h4>
              <p>Created on: {new Date(data.outfit.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitDetail;