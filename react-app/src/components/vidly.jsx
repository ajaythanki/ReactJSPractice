import React, { Component } from "react";
import { genres, getGenres } from "../services/fakeMovieService";
import {
  deleteMovie,
  saveMovie,
  getMovie,
  getMovies
} from "../services/fakeMovieService";

class Vidly extends Component {
  state = { count: 0 };

  getMovieList = () => {
    const item = getMovies();
    return item.map(data => (
      <tr>
        <td key={data._id}>{data.title}</td>
        <td>{data.genre.name}</td>
        <td>{data.numberInStock}</td>
        <td>{data.dailyRentalRate}</td>
        <td>
          <button className="warning" value="Delete">
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <main className="container">
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
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Vidly;
