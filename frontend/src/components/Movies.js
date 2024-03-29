import React from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { loadMore } from "../redux/movieSlice";

const Movies = () => {
  const moviesList = useSelector(({ movies }) => movies.moviesList);
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    dispatch(loadMore());
  };
  if (moviesList?.length === 0)
    return <p>There are no movies in the database.</p>;
  return (
    <div className="container mt-2 mx-auto text-center">
      <p className="text-center text-lg text-white font-medium my-4">Showing {moviesList?.length} movies in the database.</p>
      <div className="grid grid-col-1 sm:grid-cols-3 sm:gap-0 lg:gap-0 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
        {moviesList?.map((movie) => (
          <div className="w-96 my-2 sm:w-56 lg:w-80 sm:mx-0 lg:m-2 justify-self-center" key={"card"+movie._id}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
      <button className="text-lg text-white p-4 mx-auto hover:text-blue-400" onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Movies;
