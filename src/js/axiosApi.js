import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41258142-5d5bb85654e4b5c96670e266f';



export function getPhoto(query, page) {
  return axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: page,
    },
  });
}

// Your API key: 41258142-5d5bb85654e4b5c96670e266f
