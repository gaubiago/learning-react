import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Heart from "./heart";

class Movies extends Component {
  state = {
    movies: getMovies().map((movie) => {
      return { ...movie, fullHeart: false };
    }),
    headerKeys: ["Title", "Genre", "Stock", "Rate", "", ""],
  };

  handleDelete = (movie) =>
    this.setState({
      movies: this.state.movies.filter((_movie) => _movie._id !== movie._id),
    });

  handleHeartClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].fullHeart = !movies[index].fullHeart;
    this.setState({ movies });
  };

  printSizeMsg = () =>
    this.state.movies.length === 0
      ? "There are no movies in the database."
      : `Showing ${this.state.movies.length} movies in the database.`;

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies i the database.</p>;

    return (
      <React.Fragment>
        <p>{this.printSizeMsg()}</p>
        {this.state.movies.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                {this.state.headerKeys.map((key, idx) => (
                  <th scope="col" key={idx}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie, idx) => {
                return (
                  <tr key={idx}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Heart
                        onHeartClick={this.handleHeartClick}
                        movie={movie}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
