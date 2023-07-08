import React from "react";
import { genres } from "../services/genreService";
import { Link } from "react-router-dom";

const Filter = () => {
  return (
    <div className="flex mx-5 justify-center items-center mt-3">
      <ul className="flex flex-wrap list-none">
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <Link
                to={genre.id === 1 ? `/` : `/movies/genre/${genre.id}`}
                className="font-bold text-blue-200 mx-2 transition-all duration-300 hover:text-white"
              >
                {genre.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
