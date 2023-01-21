import React from "react";
import Like from "./common/like";

//https://image.tmdb.org/t/p/w1280/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg
const Card = (props) => {
  console.log("Card Rendered");
  let  movie = props.objectProps;
  const {handleLike} = props;
  // console.log(movie);
  return (
    <React.Fragment>
      <div className="card m-3 pb-3" key={movie._id}>
        <img
          src={movie.poster_path}
          className="movie-image"
          alt={movie.title}
        />
        <h2 className="title text-center">{movie.title}</h2>
        <div className="button-wrapper d-flex justify-content-around">
          <p>
            Genre: <span className="genre">{movie.genreName}</span>
          </p>
          <p>
            Stock: <span className="stock">{movie.numberInStock}</span> | Rate:
            <span className="rate">{movie.dailyRentalRate}</span>
          </p>
        </div>
        <p className="text-center">
          Reviews:
          <span className="review">
            <i className="fa fa-star" aria-hidden="true"></i>
          </span>
          {movie.reviews}
        </p>
        <div className="button-wrapper d-flex justify-content-around">
          <button className="btn btn-success btn-sm">Reviews </button>
          <Like liked={movie.liked} onClick={handleLike} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;


