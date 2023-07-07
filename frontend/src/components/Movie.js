import React, { useEffect, useState } from "react";
import { getGenre } from "../services/genreService";
import Like from "./Like";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createReview,
  deleteMovieReview,
  likeMovie,
  mapReviewsToMovie,
} from "../redux/movieSlice";
import { notify } from "../redux/notificationSlice";

const Movie = ({ movie }) => {
  const user = useSelector((state) => state.user);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter < 2) {
      dispatch(mapReviewsToMovie(movie));
      setCounter(counter + 1);
    }
  }, [dispatch, movie, counter]);

  const isLiked = movie?.liked?.find(
    (l) => l.user.username === user.username
  )?.isLiked;
  if (isLiked !== undefined) {
    console.log(isLiked);
  } else {
    console.log(isLiked);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.length > 0) {
      dispatch(createReview(movie, review));
      dispatch(notify("Review submitted", "Success"));
      setReview("");
      setCounter(0);
    }
  };

  const handleDelete = (movie) => {
    dispatch(deleteMovieReview(movie, user));
  };

  if (!movie) return <p>Something went wrong</p>;
  return (
    <div className="container pb-10 w-1/2 overflow-hidden mx-auto">
      <div className="flex text-white mt-3 gap-6">
        <div className="flex flex-col hover:scale-105 transition-all duration-300">
          <div className="card">
            <img
              src={movie.poster_path}
              className="movie-image"
              alt={movie.title}
              style={{ maxHeight: 800, objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="flex p-3 flex-col backdrop-blur-2xl">
          <div className="card p-3">
            <h1 className="text-center font-semibold text-5xl">
              {movie.title}
            </h1>
            <div className="px-2 flex justify-around my-3">
              <div className="flex">
                Genres:
                <div className="flex justify-around">
                  {movie.genreIds.map((genreId, index) => {
                    return (
                      <Link
                        key={genreId}
                        to={`/movies/genre/${genreId}`}
                        className="genre link-secondary mx-2"
                      >
                        {getGenre(genreId).name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div className="flex w-full">
                <div className="flex-wrap w-auto mx-auto text-center">
                  <div className="mb-3">
                    <strong className="vote_count text-lg">
                      {" "}
                      <em>{movie.vote_count}</em>
                    </strong>{" "}
                    people voted.
                  </div>

                  <h1 className="inline-flex w-auto text-5xl mx-auto hover:scale-125 transition-all duration-300">
                    <Like
                      liked={isLiked === undefined ? false : isLiked}
                      onClick={
                        user.token
                          ? () => {
                              dispatch(likeMovie(movie, user));
                              // setCounter(2);
                            }
                          : () => navigate("/login")
                      }
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-3">
            {!user.token && (
              <>
                <button
                  className="bg-transparent border-0 w-1/2 mx-auto text-lg font-medium hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  Write an Review
                </button>
              </>
            )}

            {user.token && (
              <form onSubmit={handleSubmit} className="flex flex-col text-center">
                <div className="flex flex-col justify-center items-center">
                  <label
                    className="text-lg font-medium"
                    htmlFor="review"
                  >
                    Write an Review
                  </label>
                  <textarea
                    className="text-black w-full p-2 mb-3 outline-none rounded-md"
                    id="review"
                    rows="3"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    required
                  />
                  {review.length > 0 && (
                    <button className="flex w-fit px-4 py-1 font-medium rounded-md text-2xl border border-double text-center hover:bg-white hover:text-black transition-all duration-300">
                      Save
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
          <div className="flex flex-col">
            <h4>Reviews:</h4>
            {movie.reviews?.map((review, index) => {
              return (
                <div key={index} className="flex justify-between p-3 items-center">
                  <span className="flex items-center">
                    <strong className="text-2xl mr-2">
                      <em>{review.reviewText}</em>
                    </strong>
                    by <small className="ml-1">{review.name}</small>
                  </span>
                  <div>
                    {review.username === user.username && (
                      <>
                        <span
                          className="font-semibold bg-blue-400 ml-1 hover:cursor-pointer rounded py-1 px-2"
                          onClick={() => setReview(review.reviewText)}
                        >
                          Edit
                        </span>
                        <span
                          className="font-semibold ml-1 bg-red-400 hover:cursor-pointer rounded py-1 px-2"
                          onClick={() => handleDelete(movie)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
