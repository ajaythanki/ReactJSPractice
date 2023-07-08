import React, { useEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import {
  initializeMovies,
  initializeMoviesByGenre,
  searchMovies,
} from "./redux/movieSlice";

import {
  Menu,
  Movie,
  Movies,
  LoginForm,
  Notification,
  Filter,
} from "./components/";

const App = () => {
  const dispatch = useDispatch();
  const matchSearch = useMatch("/search/:query");
  const matchGenre = useMatch("/movies/genre/:genreId");
  const match = useMatch("/movie/:id");
  const movies = useSelector(({ movies }) => movies.moviesList);
  useEffect(() => {
    if (!movies?.length) {
      dispatch(initializeMovies());
    }
  }, [dispatch, movies]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedMovieAppUser");
    if (loggedUserJSON !== undefined) {
      const user = JSON.parse(loggedUserJSON);
      if (user?.token) dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    if (matchSearch?.params?.query) {
      dispatch(searchMovies(matchSearch.params.query));
    } else if (matchGenre?.params?.genreId) {
      dispatch(initializeMoviesByGenre(matchGenre?.params?.genreId));
    }
  }, [matchSearch, matchGenre, dispatch]);

  const movie = match
    ? movies?.find((m) => m._id === Number(match.params.id))
    : null;

  return (
    <div className="w-full bg-ajay">
      <Menu />
      <Notification />
      <Filter />
      <Routes>
        <Route exact path="/movie/:id" element={<Movie movie={movie} />} />
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/search/:query" element={<Movies />} />
        <Route exact path="/movies/genre/:genreId" element={<Movies />} />
      </Routes>
    </div>
  );
};

export default App;
