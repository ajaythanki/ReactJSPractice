import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Movies = () => {
  const moviesList = useSelector(({ movies }) => movies.moviesList);

  if (moviesList?.length === 0)
    return <p>There are no movies in the database.</p>;
  return (
    <div className="container mt-2 mx-auto">
      <p>Showing {moviesList?.length} movies in the database.</p>
      <div className="grid grid-cols-4 gap-2">
        {moviesList?.map((movie) => (
          <div className="grid-flow-col" key={movie._id}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
