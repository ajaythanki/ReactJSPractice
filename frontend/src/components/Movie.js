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
    if(counter<2) {
      dispatch(mapReviewsToMovie(movie));
      setCounter(counter+1);
    }
  }, [dispatch, movie, counter]);

  const isLiked = movie?.liked?.find(l=>l.user.username===user.username)?.isLiked;
  if(isLiked!==undefined) {
    console.log(isLiked);
  }else{
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

  const handleDelete = (movie)=>{
    dispatch(deleteMovieReview(movie, user));
  }
  
  if (!movie) return <p>Something went wrong</p>;
  return (
    <div className="container mx-auto">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="card m-3 pb-3">
            <img
              src={movie.poster_path}
              className="movie-image"
              alt={movie.title}
              style={{ maxHeight: 800, objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="title text-center">{movie.title}</h1>
            <div className="px-2 flex justify-around">
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
            <div className="flex">
              <div className="flex w-full justify-between">
                <h3>
                  <strong className="vote_count"> {movie.vote_count}</strong>{" "}
                  people voted.
                </h3>
                <h2>
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
                </h2>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center"></div>
          </div>

          {!user.token && (
            <>
              <button
                className="bg-transparent border-0"
                onClick={() => navigate("/login")}
              >
                Write an Review
              </button>
            </>
          )}
          {user.token && (
            <div className="form-group">
              <form onSubmit={handleSubmit}>
                <label htmlFor="review">Write an Review</label>
                <textarea
                  className="form-control"
                  id="review"
                  rows="3"
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                  required
                />
                {review.length > 0 && (
                  <button className="flex ml-auto btn btn-primary">
                    Save
                  </button>
                )}
              </form>
            </div>
          )}
          <div className="reviews">
            <h4>Reviews:</h4>
            {movie.reviews?.map((review, index) => {
              return (
                <div key={index}>
                  <p>
                    <strong>
                      {review.reviewText}
                      {review.username === user.username && (
                        <>
                          <span
                            className="edit ml-1 btn-info rounded py-1 px-2"
                            onClick={()=>setReview(review.reviewText)}
                          >
                            Edit
                          </span>
                          <span
                            className="delete ml-1 btn-danger rounded py-1 px-2"
                            onClick={()=>handleDelete(movie)}
                          >
                            Delete
                          </span>
                        </>
                      )}
                    </strong>
                    <br /> by <small>{review.name}</small>
                  </p>
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
