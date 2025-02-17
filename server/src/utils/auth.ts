import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request } from 'express';
import { AuthContext } from '../types';

dotenv.config();

// Set token secret and expiration date
const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = '2h';

interface JwtPayload {
  data: {
    username: string;
    email: string;
    _id: string;
  };
}

export const authMiddleware = ({ req }: { req: Request }): AuthContext => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim() || '';
  }

  if (!token) {
    return { user: null };
  }

  // Verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;
    return { user: data };
  } catch {
    console.log('Invalid token');
    return { user: null };
  }
};

interface TokenUser {
  username: string;
  email: string;
  _id: string;
}

export const signToken = (user: TokenUser): string => {
  const payload = { username: user.username, email: user.email, _id: user._id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};