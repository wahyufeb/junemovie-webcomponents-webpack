/* Default Region ID = Indonesia */

import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '8eaebc90eb62b17298e577b8f6da8061';
const DEFAULT_LANGUAGE = 'en-US';
const DEFAULT_REGION = 'ID';

const searchingMovie = async (query) => {
  try {
    const { data } = await axios.get(`${API_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: DEFAULT_LANGUAGE,
        include_adult: false,
        query,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const trendingMovie = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const upcomingMovie = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: DEFAULT_LANGUAGE,
        page: 1,
        region: 'ID',
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const popularMovie = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: DEFAULT_LANGUAGE,
        region: DEFAULT_REGION,
        page: 1,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export {
  searchingMovie, trendingMovie, upcomingMovie, popularMovie,
};
