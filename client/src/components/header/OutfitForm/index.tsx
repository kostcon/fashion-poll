import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_OUTFIT } from '../../utils/mutations';
import { QUERY_OUTFITS, QUERY_ME } from '../../utils/queries';
import { OutfitFormState } from '../../types';

const OutfitForm: React.FC = () => {
  const [formState, setFormState] = useState<OutfitFormState>({
    name: '',
    description: '',
    imageUrl: '',
    category: 'Casual',
  });

  const [createOutfit, { error }] = useMutation(CREATE_OUTFIT, {
    update(cache, { data: { createOutfit } }) {
      try {
        // Update outfits query
        const { outfits }: any = cache.readQuery({ query: QUERY_OUTFITS });
        cache.writeQuery({
          query: QUERY_OUTFITS,
          data: { outfits: [createOutfit, ...outfits] },
        });

        // Update me query
        const { me }: any = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me } },
        });
      } catch (e) {
        console.error('Error updating cache:', e);
      }
    },
  });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createOutfit({
        variables: { ...formState },
      });

      setFormState({
        name: '',
        description: '',
        imageUrl: '',
        category: 'Casual',
      });
    } catch (err) {
      console.error('Error creating outfit:', err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-light p-2">
        <h4>Create a New Outfit</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Outfit Name:</label>
            <input
              className="form-control"
              placeholder="Enter outfit name"
              name="name"
              type="text"
              id="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              placeholder="Enter outfit description"
              name="description"
              id="description"
              value={formState.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              className="form-control"
              placeholder="Enter image URL"
              name="imageUrl"
              type="url"
              id="imageUrl"
              value={formState.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <select
              className="form-control"
              name="category"
              id="category"
              value={formState.category}
              onChange={handleChange}
              required
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Sportswear">Sportswear</option>
              <option value="Evening">Evening</option>
              <option value="Beach">Beach</option>
              <option value="Winter">Winter</option>
            </select>
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
          >
            Create Outfit
          </button>
          {error && (
            <div className="text-danger mt-2">
              Error creating outfit: {error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OutfitForm;