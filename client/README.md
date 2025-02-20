# Fashion Poll - Social Fashion Voting Platform

## Description
Fashion Poll is a dynamic web application where users can share, vote on, and save their favorite outfits. Built with a modern tech stack including React, TypeScript, GraphQL, Node.js, and MongoDB, this platform provides a seamless experience for fashion enthusiasts to engage with and discover new styles.

## Features
- User authentication with JWT
- Create and share outfit posts
- Vote on outfits (upvote/downvote)
- Save favorite outfits
- Filter outfits by category
- Responsive design for all devices
- Real-time updates using GraphQL

## Technologies Used
- Frontend:
  - React with TypeScript
  - Apollo Client
  - React Router
  - JWT Authentication
  - Bootstrap for styling
  
- Backend:
  - Node.js with Express
  - TypeScript
  - GraphQL with Apollo Server
  - MongoDB with Mongoose
  - JWT for authentication

- Deployment:
  - Render for hosting
  - MongoDB Atlas for database
  - GitHub Actions for CI/CD

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/fashion-poll.git
cd fashion-poll
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a .env file in the server directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3001
```

4. Start the development servers:
```bash
# Start server
cd server
npm run dev

# Start client (in a new terminal)
cd client
npm start
```

5. Visit `http://localhost:3000` in your browser

## Deployment
This application is deployed on Render. The process includes:
1. Connecting your GitHub repository to Render
