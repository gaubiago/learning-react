import React from "react";

const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  onGenreChange,
  currentGenre,
}) => {
  const activateCurrentGenre = (genreName) => {
    let classes = "list-group-item";
    if (genreName === currentGenre.name) classes += " active";
    return classes;
  };

  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={activateCurrentGenre(genre.name)}
          onClick={() => onGenreChange(genre)}
        >
          {/* {console.log(classes)} */}
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
