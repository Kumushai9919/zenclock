import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export const getRandomImage = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: 'anime lofi animenature',
        per_page: 200,
        safesearch: true,
      },
    });
    
    const images = response.data.hits;
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return randomImage.largeImageURL;
  } catch (error) {
    console.error('Error fetching background image:', error);
    return '';
  }
}; 