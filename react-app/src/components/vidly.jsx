import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Card from "./card";
// import Like from "./common/like";
const Vidly = () => {
  // state = { movies: getMovies() };
  const [movies, setMovies] = useState(getMovies())
  // componentDidUpdate(prevProps, prevState) {
  //   // console.log("prevProps", prevProps);
  //   // console.log("prevState", prevState);
  //   if (prevState.movies.value !== movies.value) {
  //     //Ajax call
  //     console.log(movies)
  //     // this.setState({ movies:this.movies });

  //   }
  // }
  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies( newMovies);
  };

  const fff = ()=>{
    return handleLike = ()=>{}
  }
  const handleLike = (movie) => {
    // return () => {
      const newMovies = [...movies];
      const index = newMovies.indexOf(movie);
      newMovies[index] = { ...newMovies[index] };
      newMovies[index].liked = !newMovies[index].liked;
      console.log("newMovies",newMovies);
      setMovies(newMovies);
    // }
  };

    // render() {
      console.log("movies",movies)
    const count = movies.length;
    const movies_arr = [...movies]
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <div className="container py-5">
          <div className="row">
            <p>Showing {count} movies in the database.</p>

            {movies_arr.map((movie) => {
              return (
                <div className="col-sm-4" key={movie._id}>
                  <Card
                    objectProps={{
                      _id: movie._id,
                      title: movie.title,
                      poster_path:movie.poster_path,
                      genreName: movie.genre.name,
                      numberInStock: movie.numberInStock,
                      dailyRentalRate: movie.dailyRentalRate,
                      liked: movie.liked,
                      // handleLikeRef: handleLike,
                    }}
                    handleLike={()=>handleLike(movie)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  // }
}

export default Vidly;
