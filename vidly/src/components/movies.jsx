import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import CatList from "./common/catList";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    headerKeys: ["Title", "Genre", "Stock", "Rate", "", ""],
    currentPage: 1,
    pageSize: 4,
    currentGenre: { _id: 0, name: "All Genres" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies().map((movie) => ({ ...movie, fullHeart: false })),
      genres: [{ _id: 0, name: "All Genres" }, ...getGenres()],
    });
  }

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

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handlePageClick = (page) => {
    this.setState({ currentPage: page });
  };

  printSizeMsg = (count) =>
    this.state.movies.length === 0
      ? "There are no movies in the database."
      : `Showing ${count} movies in the database.`;

  updateGenreCount = (genreCount) => {
    this.setState({ genreCount });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      currentGenre,
    } = this.state;

    const filtered =
      currentGenre.name !== "All Genres"
        ? allMovies.filter((movie) => movie.genre.name === currentGenre.name)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <CatList
            genres={allGenres}
            onGenreChange={this.handleGenreChange}
            currentGenre={currentGenre}
          />
        </div>
        <div className="col">
          <p>{this.printSizeMsg(filtered.length)}</p>
          {this.state.movies.length !== 0 && (
            <table className="table" style={{ marginRight: 150 }}>
              <thead>
                <tr>
                  {this.state.headerKeys.map((key, idx) => (
                    <th scope="col" style={{ marginRight: 150 }} key={idx}>
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
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageClick={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
