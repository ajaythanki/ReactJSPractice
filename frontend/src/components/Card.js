import React from "react";
import Like from "./Like";
import { Link, useNavigate } from "react-router-dom";
import { getGenre } from "../services/genreService";
import { likeMovie } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ movie, style = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const { title, poster_path, genreIds, popularity, vote_count, liked } = movie;

  const isLiked = liked?.find(
    (l) => l.user.username === user?.username
  )?.isLiked;

  return (
    <div className="text-white w-full m-2 justify-center rounded-md hover:scale-105 backdrop-blur-2xl transition-all duration-300">
      <img
        style={{ cursor: "pointer", maxHeight: 800, objectFit: "cover", borderRadius:10 }}
        src={poster_path}
        className=""
        alt={title}
        onClick={() => navigate(`/movie/${movie._id}`)}
      />
      <div className="min-h-[210px] text-center py-3 ">
        <h2 className="font-bold text-2xl text-center">
          {title.length>15 ? (title.slice(0, 25) + "...") : title}
        </h2>
        <div className="px-2 flex justify-around">
          <div className="flex">
            Genres:
            <div className="">
              {genreIds.map((genreId, index) => {
                return (
                  <span key={genreId}>
                    <Link
                      // key={genreId}
                      to={genreId === 1 ? `/` : `/movies/genre/${genreId}`}
                      className="genre text-slate-50 hover:underline hover:text-blue-400 mx-2"
                    >
                      {getGenre(genreId).name}
                    </Link>
                    {genreIds.length - 1 !== index ? " | " : ""}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <span className="stock">Popularity: {popularity}</span>
          <span className="rate">Votes: {vote_count}</span>
        </div>
        <button
          className="bg-transparent border-0 my-2 text-lg font-medium hover:text-blue-400"
          onClick={() => navigate(`/movie/${movie._id}`)}
        >
          Write an Review
        </button>
        <div className=" flex justify-around text-2xl">
          <Like
            liked={isLiked === undefined ? false : isLiked}
            onClick={
              user.token
                ? () => dispatch(likeMovie(movie, user))
                : () => navigate("/login")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Card;