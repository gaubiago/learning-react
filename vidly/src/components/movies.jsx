import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies().map((movie) => {
      return { ...movie, fullHeart: false };
    }),
    headerKeys: ["Title", "Genre", "Stock", "Rate", "", ""],
    currentPage: 1,
    pageSize: 4,
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

  handlePageClick = (page) => {
    this.setState({ currentPage: page });
  };

  printSizeMsg = () =>
    this.state.movies.length === 0
      ? "There are no movies in the database."
      : `Showing ${this.state.movies.length} movies in the database.`;

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies i the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);
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
              {movies.map((movie, idx) => {
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
                        onClick={this.handleDelete}
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
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageClick={this.handlePageClick}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
