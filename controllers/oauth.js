/* eslint-disable no-undef */
const axios = require('axios');

async function getSpotifyUser(accessToken) {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const user = {
    username: data.id,
    displayName: data.display_name,
    email: data.email,
    avatar: data.images[0].url,
  };

  return user;
}

module.exports = {
  getSpotifyUser,
};
