# **Ambient NodeJS-Fastify**

![alt text](assets/ambient.svg)

<br>
🚀 Deployment: 

[https://ambient-niqfhm2phq-ey.a.run.app](https://ambient-niqfhm2phq-ey.a.run.app/)

## Project Status 🚧

The development of the project is still in progress. Currently we are working on controlling music playback and playlists for upcoming shows directly from Spotify.

## Installation 📦

Prerequisites: `nodejs v16.13.0` or newer and `npm 8.3.1` or newer.

To install this project and run it locally, please follow the following steps:

1. Open the terminal and run `git clone https://github.com/athifongoqa/ambient-BE.git`;
2. Navigate to the repository (`cd ambient-BE`);
3. Navigate to the branch you are interested in (`git checkout BRANCH_NAME`);
4. Install the npm packages by running `npm install `;
5. Either run the development server with `npm run dev` or run the app for better performances by running `npm run start`;
6. Visit http://0.0.0.0:3000.
7. To login, visit http://0.0.0.0:3000/login/spotify

## .env
```
CLIENT_ID= # Spotify client id - visit: https://developer.spotify.com/dashboard and create a new application
CLIENT_SECRET= # Spotify client secret - visit: https://developer.spotify.com/dashboard and create a new application
MONGODB= # MongoDB URI
FASTIFY_ADDRESS=0.0.0.0
JWT_SECRET= # your secret
```

## Testing 🧪

This app uses Jest, and Mocha for Unit & Integration tests.

You can run the Unit and Integration tests by simply running `npm run test`.

## Project Structure 🏗

Here is a description of the content of each folder in the directory:

```
.                           # Root directory.
├── .github                 # Convention folder used to place Github related folders and files
│   └── workflows           # Configuration folder containing yml files for GitHub Actions
│       └── gcp             # yml file for handling deployment jobs
├── controllers             # Handler functions
│   ├── admin                
│   ├── shows                
│   ├── sockets                
│   └── users                         
├── models                  # Show & User models & schemas
│   ├── shows.model             
│   └── users.model           
├── plugins 
│   ├── jwt                 # JWT-related decorators
│   ├── sockets             # Fastify-socket.io events and connection 
│   ├── spotify             # Spotify OAuth support 
│   └── swagger             # Documentation support using Swagger          
├── routes                    
│   ├── api                 
│   │   ├── shows           
│   │   │   ├── index       # Show endpoints
│   │   │   └── schema      # Show schema definitions
│   │   └── users           
│   │       ├── index       # User endpoints
│   │       └── schema      # User schema definitions
│   ├── spotify              
│   │   └── index           # Spotify callback and user sign-in
│   └── root                # Health-check
├── tests                   # Unit & integration tests
│   └── routes              
│       ├── routes                           
│       │   ├── admin.integration                   
│       │   ├── shows.integration                   
│       │   ├── shows.test                   
│       │   ├── users.integration                   
│       ├── dummyShows      # Mock shows                     
│       ├── helper          # Builds server for tests               
│       └── testdb          # Mock database               
└── app                     # Main server file
```

## Current Features 🔥

The features currently available in this app include:

- Secure OAuth integration with Spotify
- Secure authentication and authorisation with JSON Web Tokens
- API for users and shows endpoints
- Websockets for audio streaming and chat functionality
- Unit & Integration tests
- API documnetation using Swagger
- Deployed using Google Cloud Platform's Cloud Run

## Upcoming Features 🔮

The features that will be implemented soon in the future include:

- Spotify music playback streaming through websocket server
- Storing playlists for upcoming shows
- The social functionalities that will allow the users to follow each other and see each other's acitity are also under development.