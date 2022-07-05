import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: { _id: 0, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
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

  handleHeart = (movie) => {
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

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  printSizeMsg = (count) =>
    this.state.movies.length === 0
      ? "There are no movies in the database."
      : `Showing ${count} movies in the database.`;

  updateGenreCount = (genreCount) => {
    this.setState({ genreCount });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
    } = this.state;

    const filtered =
      currentGenre.name !== "All Genres"
        ? allMovies.filter((movie) => movie.genre.name === currentGenre.name)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const headerKeys = ["Title", "Genre", "Stock", "Rate", "", ""];

    const {
      pageSize,
      currentPage,
      genres: allGenres,
      currentGenre,
      sortColumn,
    } = this.state;

    if (this.state.movies.length === 0) return this.printSizeMsg(0);

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={allGenres}
              onGenreChange={this.handleGenreChange}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col">
            <p>{this.printSizeMsg(totalCount)}</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onHeart={this.handleHeart}
              onDelete={this.handleDelete}
              headerKeys={headerKeys}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageClick={this.handlePageClick}
            />
          </div>
        </div>
        <div className="row"></div>
      </React.Fragment>
    );
  }
}

export default Movies;
