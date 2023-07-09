import React from "react";
import Like from "./Like";
import { useNavigate } from "react-router-dom";
// import { getGenre } from "../services/genreService";
import { likeMovie } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ movie, style = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const { title, poster_path, vote_count, liked } = movie;

  const isLiked = liked?.find(
    (l) => l.user.username === user?.username
  )?.isLiked;

  return (
    <div className="text-white w-full justify-center rounded-md hover:scale-105 backdrop-blur-2xl transition-all duration-300">
      <img
        style={{ cursor: "pointer", maxHeight: 800, objectFit: "cover", borderRadius:10 }}
        src={poster_path}
        className=""
        alt={title}
        onClick={() => navigate(`/movie/${movie._id}`)}
      />
      <div className="sm:min-h-[180px] text-center p-3 sm:py-3 ">
        <h2 className="font-bold text-xl lg:text-2xl text-center my-2">
          {/* {title.length>20 ? (title.slice(0, 20) + "...") : title} */title}
        </h2>
        {/* <div className="px-2 flex-col md:flex justify-around">
          <div className="flex sm:text-sm">
            <div className="flex flex-col">
            Genres:
              {genreIds.map((genreId, index) => {
                return (
                  <span key={genreId} className="flex">
                    <Link
                      // key={genreId}
                      to={genreId === 1 ? `/` : `/movies/genre/${genreId}`}
                      className="genre text-slate-50 hover:underline hover:text-blue-400 mx-2"
                    >
                      {getGenre(genreId).name}
                    </Link>
                    <span className="hidden lg:flex"> {genreIds.length - 1 !== index ? " | " : ""}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div> */}
        <div className="flex justify-around items-center">
          <span className="likes">Likes: {vote_count}</span>
        <div className=" flex justify-around my-2 text-2xl">
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
        <button
          className="bg-transparent border-0 text-lg font-medium hover:text-blue-400"
          onClick={() => navigate(`/movie/${movie._id}`)}
        >
          Read more
        </button>
        
      </div>
    </div>
  );
};

export default Card;