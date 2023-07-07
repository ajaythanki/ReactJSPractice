import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Movies = () => {
  const moviesList = useSelector(({ movies }) => movies.moviesList);

  if (moviesList?.length === 0)
    return <p>There are no movies in the database.</p>;
  return (
    <div className="container flex-row text-white text-center mx-auto mt-2">
      <p className="block text-lg font-medium mb-2">Showing {moviesList?.length} movies in the database.</p>
      <div className="flex flex-row flex-wrap">
        {moviesList?.map((movie) => (
          <div className="flex flex-col w-1/4" key={movie._id}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
