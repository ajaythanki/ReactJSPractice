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
                className="genre text-slate-50 hover:underline mx-2"
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
