# Fashion Poll - Social Fashion Voting Platform

## Description
Fashion Poll is a TypeScript-based web application where users can share, vote on, and save their favorite outfits. Built with a modern tech stack including React, TypeScript, GraphQL, Node.js, and MongoDB, this platform provides a seamless experience for fashion enthusiasts to engage with and discover new styles.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:**
  - JWT-based secure authentication
  - User registration and login
  - Protected routes and API endpoints

- **Outfit Management:**
  - Create and share outfit posts
  - Upload outfit images
  - Categorize outfits (Casual, Formal, Sportswear, etc.)
  - Add descriptions and details

- **Social Interaction:**
  - Vote on outfits (upvote/downvote)
  - Save favorite outfits
  - View voting statistics

- **User Experience:**
  - Responsive design for all devices
  - Category-based filtering
  - Real-time updates using GraphQL
  - User profiles with saved outfits

## Technologies Used

### Frontend
- React 18 with TypeScript
- Apollo Client for GraphQL
- React Router v6
- JWT Authentication
- Bootstrap 5 for styling
- ESLint & Prettier

### Backend
- Node.js with Express
- TypeScript
- GraphQL with Apollo Server
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

### Development & Deployment
- GitHub Actions for CI/CD
- Render for hosting
- MongoDB Atlas for database
- ESLint for code quality
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection string)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/fashion-poll.git
cd fashion-poll
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create environment variables:

Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

Create a `.env` file in the client directory:
```env
REACT_APP_GRAPHQL_URI=http://localhost:3001/graphql
```

### Usage

1. Start the development server:
```bash
# In the server directory
npm run dev
```

2. Start the client application:
```bash
# In the client directory
npm start
```

3. Visit `http://localhost:3000` in your browser

## Testing

Run tests for the server:
```bash
cd server
npm test
```

Run tests for the client:
```bash
cd client
npm test
```

## Deployment

This application is configured for deployment on Render:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the environment variables
4. Set the build command: `npm install && npm run build`
5. Set the start command: `npm start`

## GitHub Actions

The project includes CI/CD pipeline using GitHub Actions:

1. Automated testing
2. TypeScript compilation check
3. Build verification
4. Deployment to Render (when configured)

The workflow file is located at `.github/workflows/main.yml`

## Project Structure
```
fashion-poll/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── types/        # TypeScript interfaces
├── server/                # Node.js TypeScript backend
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── schemas/      # GraphQL schemas
│   │   └── utils/        # Utility functions
└── .github/              # GitHub Actions workflows
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
