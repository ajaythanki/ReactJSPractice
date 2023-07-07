import React from "react";
import Like from "./Like";
import { Link, useNavigate } from "react-router-dom";
import { getGenre } from "../services/genreService";
import { likeMovie } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ movie, style={} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const {
    title,
    poster_path,
    genreIds,
    popularity,
    vote_count,
    liked,
  } = movie;

  const isLiked = liked?.find(l=>l.user.username===user?.username)?.isLiked;

    return (
    <div className="flex-col text-white w-full p-2 justify-center hover:scale-105 transition-all duration-300">
      <img
        style={{ cursor: "pointer", maxHeight: 800, objectFit: "contain" }}
        src={poster_path}
        className="movie-image"
        alt={title}
        onClick={() => navigate(`/movie/${movie._id}`)}
      />
      <div className="backdrop-blur-lg">
        <h2 className="font-bold text-center">{title}</h2>
        <div className="px-2 flex justify-around">
          <div className="d-flex">
            Genres:
            <div className="">
              {genreIds.map((genreId, index) => {
                return (
                  <>
                  <Link
                    key={genreId}
                    to={genreId === 1 ? `/` : `/movies/genre/${genreId}`}
                    className="genre text-slate-50 hover:underline mx-2"
                  >
                    {getGenre(genreId).name}
                  </Link>
                  {genreIds.length - 1 !== index ? " | " : ""}
                  </>
                  // <span key={genreId} className="genre">
                  //   &nbsp;{getGenre(genreId).name}{" "}
                  //   {genreIds.length - 1 !== index ? " | " : ""}
                  // </span>
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
          className="bg-transparent border-0"
          onClick={() => navigate(`/movie/${movie._id}`)}
        >
          Write an Review
        </button>
        <div className=" flex justify-around">
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
