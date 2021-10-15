import axios from 'axios';

const API_KEY = '21893871-c16b87b2a4653cca508137d28';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
};

export const fetchPictures = async (searchQuery, page) => {
  const response = await axios.get('', {
    params: {
      page: page,
      q: searchQuery,
    },
  });

  return response.data;
};
