import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { FormState, AuthResponse } from '../types';

const Signup: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation<AuthResponse>(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      if (data?.addUser) {
        Auth.login(data.addUser.token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username:</label>
                <input
                  className="form-control"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="btn btn-block btn-primary"
                type="submit"
              >
                Submit
              </button>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}

            <div className="mt-3">
              <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;