import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// Get access token
const getAccessToken = async () => {
  try {
    console.log('Getting access token...');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
      }
    );
    console.log('Access token received');
    return response.data.access_token;
  } catch (error) {
    console.error('Access token error:', error.response?.data || error.message);
    throw error;
  }
};

// Get study playlists
export const getStudyPlaylists = async () => {
  try {
    const token = await getAccessToken();
    
    if (!token) {
      throw new Error('Failed to get access token');
    }

    const response = await axios.get(
      'https://api.spotify.com/v1/search',
      {
        params: {
          q: 'study lofi',
          type: 'playlist',
          limit: 10
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log('Playlists response:', response.data);
    
    // if (!response.data.playlists?.items) {
    //   throw new Error('No playlists found in response');
    // }

    // return response.data.playlists.items;
    // Filter out null items and ensure we have valid playlists
    const validPlaylists = response.data.playlists.items.filter(playlist => 
      playlist && playlist.id && playlist.name
    );

    return validPlaylists;
  } catch (error) {
    console.error('Playlist fetch error:', error.response?.data || error.message);
    throw error;
  }
}; 