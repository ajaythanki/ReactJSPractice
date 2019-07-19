import React, { Component } from "react";
// import { genres, getGenres } from "../services/fakeMovieService";
import {
  deleteMovie,
  // saveMovie,
  // getMovie,
  getMovies
} from "../services/fakeMovieService";

class Vidly extends Component {
  state = {
    count: 0,
    movies: this.getMovieList
  };

  handleDelete = () => {
    this.setState({ movies: this.state.movies });
    // this.setState({ count: Object.keys(this.getMovieList()).length });
  };

  getMovieList = () => {
    const item = getMovies();

    return item.map(data => (
      <tr key={data._id}>
        <td key={data.title}>{data.title}</td>
        <td key={data.genre._id}>{data.genre.name}</td>
        <td key={data.numberInStock}>{data.numberInStock}</td>
        <td key={data.dailyRentalRate}>{data.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.handleDelete(deleteMovie(data._id))}
            className="btn btn-secondary"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <main className="container">
        {Object.keys(this.getMovieList()).length === 0 ? (
          <h3>Ther are no movies in the database</h3>
        ) : (
          <h3>
            Showing
            {` ${
              Object.keys(this.getMovieList()).length
            } movies in the database `}
          </h3>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.getMovieList()}</tbody>
        </table>
      </main>
    );
  }
}

export default Vidly;
