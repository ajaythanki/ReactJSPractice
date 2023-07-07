import axios from "axios";
//https://api.themoviedb.org/3/movie/550?api_key=077654f998a44d143ff4e1c8d7100fbd
const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=077654f998a44d143ff4e1c8d7100fbd&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=077654f998a44d143ff4e1c8d7100fbd&query=";

const REVIEW_API_LINK = "http://localhost:8080/api/";

let token = "";
const loggedUserJSON = window.localStorage.getItem("loggedMovieAppUser");
if (loggedUserJSON !== undefined) {
  const user = JSON.parse(loggedUserJSON);
  token = user?.token;
}

const movieObj = (movie) => {
  return {
    _id: movie.id,
    title: movie.title,
    poster_path: `${IMG_PATH}/${movie.poster_path}`,
    reviews: [],
    genreIds: movie.genre_ids,
    release_date: movie.release_date,
    popularity: movie.popularity,
    vote_count: movie.vote_count,
    liked: [
      {
        isLiked: false,
        user: {},
      },
    ],
  };
};

const getAll = async () => {
  try {
    const response = await axios.get(APILINK);
    const { results } = response.data;
    const movies = results.map((movie) => movieObj(movie));
    return movies;
  } catch (error) {
    console.log(error);
  }
};
const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${REVIEW_API_LINK}movies/reviews/${movieId}`
    );
    if (response) {
      // console.log(response);
      return response;
    }else{
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getAllByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${APILINK}&with_genres=${genreId}`);
    const { results } = response.data;
    const movies = results.map((movie) => movieObj(movie));
    return movies;
  } catch (error) {
    console.log(error);
  }
};
const searchMovie = async (query) => {
  try {
    const response = await axios.get(`${SEARCHAPI}${query}`);
    const { results } = response.data;
    const movies = results.map((movie) => movieObj(movie));
    return movies;
  } catch (error) {
    console.log(error);
  }
};

const likeDislikeMovie = async (movieId, liked) => {
  try {
    console.log(movieId, liked);
    if (token) {
      const response = await axios.post(
        `${REVIEW_API_LINK}movies/like`,
        {
          movieId,
          liked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // if(res)
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
const getMoviesLikes = async () => {
  try {
    const response = await axios.get(`${REVIEW_API_LINK}movies/get-likes`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const createMovieReview = async (movie, review) => {
  try {
    const reviewObj = {
      movieId: movie._id,
      review: review,
    };
    console.log(reviewObj);
    if (token) {
      console.log(token);
      const response = await axios.post(
        `${REVIEW_API_LINK}movies/reviews`,
        reviewObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};


const deleteReview = async (movieId) => {
  try {
    console.log(movieId);
    if (token) {
      console.log(token);
      const response = await axios.delete(
        `${REVIEW_API_LINK}movies/reviews/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  } 
}


const movieService = {
  getAll,
  searchMovie,
  getAllByGenre,
  likeDislikeMovie,
  createMovieReview,
  getMovieReviews,
  getMoviesLikes,
  deleteReview  
};
export default movieService;
