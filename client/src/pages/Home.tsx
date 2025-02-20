import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_OUTFITS } from '../utils/queries';
import OutfitCard from '../components/header/OutfitCard';
import OutfitForm from '../components/header/OutfitForm';
import { Outfit } from '../types';
import Auth from '../utils/auth';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { loading, error, data } = useQuery(QUERY_OUTFITS, {
    variables: { category: selectedCategory || undefined },
  });

  const categories = ['Casual', 'Formal', 'Sportswear', 'Evening', 'Beach', 'Winter'];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10">
          {Auth.loggedIn() && (
            <OutfitForm />
          )}
          
          <div className="mb-4">
            <h2>Filter by Category</h2>
            <div className="d-flex flex-wrap gap-2">
              <button
                className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory('')}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="outfits-container">
            {data?.outfits.map((outfit: Outfit) => (
              <OutfitCard
                key={outfit._id}
                outfit={outfit}
                showVoteButtons={true}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;