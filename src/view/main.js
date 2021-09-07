import '../components/movie-section';
import '../components/search-bar';
import '../components/wrapper-card';
import {
  searchingMovie,
  trendingMovie,
  upcomingMovie,
} from '../services/movies';

const getMovieData = async ({ tipe, title, func }) => {
  const mainSectionWrapper = document.querySelector('.main-section-wrapper');
  const moviesData = document.createElement('movie-section');
  const searchComponent = document.querySelector('search-bar');
  try {
    const { results } = await func();
    moviesData.tipe = tipe;
    moviesData.title = title;
    moviesData.movies = results;

    /* Hanya mengambil data background dari movies yang trending */
    if (tipe === 'trending') {
      searchComponent.background = await results.map(
        (item) => item.backdrop_path,
      );
    }
    mainSectionWrapper.append(moviesData);
  } catch (err) {
    console.error(err);
  }
};

const main = () => {
  /* Data Wrapper */
  const mainSectionWrapper = document.querySelector('.main-section-wrapper');
  const searchResultWrapper = document.querySelector('.search-result-wrapper');

  /* Data Component */
  const searchComponent = document.querySelector('search-bar');
  const cardComponentWrapper = document.querySelector('wrapper-card');

  /* Request to API */
  getMovieData({
    tipe: 'trending',
    title: 'Sedang tren minggu ini',
    func: trendingMovie,
  });
  getMovieData({
    tipe: 'upcomming',
    title: 'Sedang diputar',
    func: upcomingMovie,
  });

  searchResultWrapper.style.display = 'none';
  /* Mencari film sesuai dengan keyword */
  searchComponent.onSearchEvent = async () => {
    const moviesFounded = document.createElement('movie-section');
    try {
      const { results } = await searchingMovie(searchComponent.value);
      moviesFounded.tipe = 'search-results';
      moviesFounded.title = 'Hasil Pencarian';
      moviesFounded.movies = results;
      searchResultWrapper.innerHTML = '';
      searchResultWrapper.appendChild(moviesFounded);

      mainSectionWrapper.style.display = 'none';
      searchResultWrapper.style.display = 'block';
    } catch (err) {
      cardComponentWrapper.renderError(err);
    }
  };
  /* Reset untuk hasil pencarian dan kembali ke landing page */
  searchComponent.onResetEvent = () => {
    mainSectionWrapper.style.display = 'block';
    searchResultWrapper.style.display = 'none';
    searchComponent.value = '';
  };
};

export default main;
