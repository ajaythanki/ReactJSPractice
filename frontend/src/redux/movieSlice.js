import { createSlice } from "@reduxjs/toolkit";
import movieService from "../services/movieService";
import { notify } from "./notificationSlice";
import { clearUser } from "./userSlice";
const movieSlice = createSlice({
  name: "moviesList",
  initialState: {},
  reducers: {
    addMovie: (state, action) => {
      state.push(action.payload);
    },
    removeMovie: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateMovie: (state, action) => {
      const movieIndexToUpdate = state.moviesList.findIndex(
        (m) => m._id === action.payload._id
      );
      state.moviesList[movieIndexToUpdate] = action.payload;
    },
    setMovies: (state, action) => {
      state.moviesList = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default movieSlice.reducer;

export const {
  addMovie,
  removeMovie,
  setError,
  setLoading,
  updateMovie,
  setMovies,
  setSearchQuery,
} = movieSlice.actions;

export const initializeMovies = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const movies = await movieService.getAll();
      if (movies?.length < 1) {
        dispatch(setError(true));
        return;
      }

      dispatch(setMovies(movies));
      dispatch(setLoading(false));
      dispatch(mapLikesToMovies(movies));
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};
export const initializeMoviesByGenre = (genreId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const movies = await movieService.getAllByGenre(genreId);
      if (movies.length < 1) {
        dispatch(setError(true));
        return;
      }
      dispatch(setMovies(movies));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};
export const createReview = (movie, review) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await movieService.createMovieReview(movie, review);
      // if(res === undefined) {
      //   dispatch(notify(`Session Expired. Please re-login to continue`, "Error"));
      //   dispatch(clearUser());
      //   return;
      // }
      if (!res?.success) {
        console.log(res);
        dispatch(setError(true));
        dispatch(notify(`Error: ${res?.message}`, "Error"));
        return;
      } else {
        dispatch(mapReviewsToMovie(movie));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};
export const deleteMovieReview = (movie, user) =>{
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await movieService.deleteReview(movie._id);
      if (!res?.success) {
        dispatch(setError(true));
        dispatch(notify(`Error: ${res?.message}`));
        return;
      }
      dispatch(setLoading(false));
      console.log(movie);
      const reviewToUpdate = movie.reviews.filter(
        (r) => r.username !== user.username
      );
        const updatedMovie = { ...movie, reviews:[...reviewToUpdate]  };
      dispatch(updateMovie(updatedMovie));
      dispatch(notify(res.message,"Success"));
    }
    catch (error) {
      console.log(error);
    }
  }
}
export const searchMovies = (searchQuery) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const movies = await movieService.searchMovie(searchQuery);
      if (movies.length < 1) {
        dispatch(setError(true));
        dispatch(notify(`Error: ${movies}`, "Error"));
      }
      dispatch(setMovies(movies));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};

export const likeMovie = (movie, user) => {
  return async (dispatch) => {
    let isLiked = false;
    const movieToUpdate = {
      ...movie,
      liked: movie.liked.map((like) => {
        isLiked = !like.isLiked;
        if (like.user.username === user.username) {
          return {
            ...like,
            isLiked,
            user: { username: user.username, name: user.name },
          };
        } else {
          return {
            ...like,
            isLiked,
            user: { username: user.username, name: user.name },
          };
        }
      }),
      vote_count: isLiked ? movie.vote_count + 1 : movie.vote_count - 1,
    };
    // console.log(`movieToUpdate ${isLiked}`, movieToUpdate);

    dispatch(setLoading(true));
    try {
      const res = await movieService.likeDislikeMovie(
        movieToUpdate._id,
        isLiked
      );
      if (!res?.success) {
        console.log(res.data);
        if(res.message === "invalid token" || res.message === "jwt expired"){
          dispatch(notify(`Session Expired. Please re-login to continue`, "Error"));
          dispatch(clearUser());
          return;
        }
        dispatch(setError(true));
        dispatch(notify(`Error: ${res.message}`, "Error"));
        return;
      } else {
        dispatch(updateMovie(movieToUpdate));
        dispatch(
          notify(
            `${movieToUpdate.title} ${isLiked ? "liked" : "unliked"}`,
            "Success"
          )
        );
        dispatch(setLoading(false));
      }
      // console.log(res);
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};

export const mapLikesToMovies = (movies) => {
  return async (dispatch) => {
    try {
      const res = await movieService.getMoviesLikes();
      console.log(res);
      const moviesToUpdate = [];
      if (res.data.success && movies?.length > 0) {
        const moviesWithLikes = res.data.data;
        moviesWithLikes.forEach((movie) => {
          const movieIndex = movies.findIndex((m) => m._id === movie.movieId);
          const movieToUpdate = movies[movieIndex];
          moviesToUpdate.push({
            ...movieToUpdate,
            liked: movie.liked,
            vote_count: movieToUpdate.vote_count + movie.totalLikes,
          });
        });

        moviesToUpdate.forEach((movie) => {
          dispatch(updateMovie(movie));
        });
      } else {
        // console.log(res)
        dispatch(setError(true));
        console.log(res);
        dispatch(notify(`Error: ${res.data.message}`, "Error"));
      }
    } catch (error) {
      console.log(error.message)
      if (error.message.includes("vote_count")) {
        return;
      }
      dispatch(setError(true));
      dispatch(notify(`Error: ${error.message}`, "Error"));
    }
  };
};
export const mapReviewsToMovie = (movie) => {
  return async (dispatch) => {
    try {
      console.log(movie);
      dispatch(setLoading(true));
      const res = await movieService.getMovieReviews(movie?._id);
      if (res?.data?.success) {
        const movieReviews = res.data.data;
        const updatedMovie = { ...movie, reviews: [...movieReviews] };
        // console.log(updatedMovie);
        dispatch(updateMovie(updatedMovie));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(true));
        if(res !== null) {
          dispatch(notify(`Error1: ${res?.data?.message}`, "Error"));
        }
      }
    } catch (error) {
      dispatch(setError(true));
      console.log(error);
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
};

export const loadMore=()=>{
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const movies = await movieService.loadMoreMovies();
      if (movies?.length < 1) {
        dispatch(setError(true));
        return;
      }
      let moviesList = getState().movies.moviesList;
      // console.log(state);
      dispatch(setMovies(moviesList.concat(movies)));
      dispatch(setLoading(false));
      dispatch(mapLikesToMovies(movies));
    } catch (error) {
      dispatch(setError(true));
      dispatch(notify(`Error: ${error}`, "Error"));
    }
  };
}