# **Ambient NodeJS-Fastify**

![alt text](assets/ambient.svg)

<br>
๐ Deployment: 

[https://ambient-niqfhm2phq-ey.a.run.app](https://ambient-niqfhm2phq-ey.a.run.app/)

## Project Status ๐ง

The development of the project is still in progress. Currently we are working on controlling music playback and playlists for upcoming shows directly from Spotify.

## Installation ๐ฆ

Prerequisites: `nodejs v16.13.0` or newer and `npm 8.3.1` or newer.

To install this project and run it locally, please follow the following steps:

1. Open the terminal and run `git clone https://github.com/athifongoqa/ambient-BE.git`;
2. Navigate to the repository (`cd ambient-BE`) and create a .env file as specified below;
3. Navigate to the branch you are interested in (`git checkout BRANCH_NAME`);
4. Install the npm packages by running `npm install `;
5. Either run the development server with `npm run dev` or run the app for better performances by running `npm run start`;
6. Visit http://0.0.0.0:3000.
7. To login, visit http://0.0.0.0:3000/login/spotify

## .env
```
CLIENT_ID= # Spotify client id - visit: https://developer.spotify.com/dashboard and create a new application & register http://0.0.0.0:3000/spotify/login/spotify/callback as the redirect URI 
CLIENT_SECRET= # Spotify client secret - visit: https://developer.spotify.com/dashboard and create a new application & register http://0.0.0.0:3000/spotify/login/spotify/callback as the redirect URI 
MONGODB= # MongoDB URI
FASTIFY_ADDRESS=0.0.0.0
JWT_SECRET= # your secret
```

## Testing ๐งช

This app uses Jest, and Mocha for Unit & Integration tests.

You can run the Unit and Integration tests by simply running `npm run test`.

## Project Structure ๐

Here is a description of the content of each folder in the directory:

```
.                           # Root directory.
โโโ .github                 # Convention folder used to place Github related folders and files
โ   โโโ workflows           # Configuration folder containing yml files for GitHub Actions
โ       โโโ gcp             # yml file for handling deployment jobs
โโโ controllers             # Handler functions
โ   โโโ admin                
โ   โโโ shows                
โ   โโโ sockets                
โ   โโโ users                         
โโโ models                  # Show & User models & schemas
โ   โโโ shows.model             
โ   โโโ users.model           
โโโ plugins 
โ   โโโ jwt                 # JWT-related decorators
โ   โโโ sockets             # Fastify-socket.io events and connection 
โ   โโโ spotify             # Spotify OAuth support 
โ   โโโ swagger             # Documentation support using Swagger          
โโโ routes                    
โ   โโโ api                 
โ   โ   โโโ shows           
โ   โ   โ   โโโ index       # Show endpoints
โ   โ   โ   โโโ schema      # Show schema definitions
โ   โ   โโโ users           
โ   โ       โโโ index       # User endpoints
โ   โ       โโโ schema      # User schema definitions
โ   โโโ spotify              
โ   โ   โโโ index           # Spotify callback and user sign-in
โ   โโโ root                # Health-check
โโโ tests                   # Unit & integration tests
โ   โโโ routes              
โ       โโโ routes                           
โ       โ   โโโ admin.integration                   
โ       โ   โโโ shows.integration                   
โ       โ   โโโ shows.test                   
โ       โ   โโโ users.integration                   
โ       โโโ dummyShows      # Mock shows                     
โ       โโโ helper          # Builds server for tests               
โ       โโโ testdb          # Mock database               
โโโ app                     # Main server file
```

## Current Features ๐ฅ

The features currently available in this app include:

- Secure OAuth integration with Spotify
- Secure authentication and authorisation with JSON Web Tokens
- API for users and shows endpoints
- Websockets for audio streaming and chat functionality
- Unit & Integration tests
- API documnetation using Swagger
- Deployed using Google Cloud Platform's Cloud Run

## Upcoming Features ๐ฎ

The features that will be implemented soon in the future include:

- Spotify music playback streaming through websocket server
- Storing playlists for upcoming shows
- The social functionalities that will allow the users to follow each other and see each other's acitity are also under development.