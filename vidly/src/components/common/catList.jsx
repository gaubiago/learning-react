import React from "react";

const CatList = (props) => {
  const { genres, textProperty, valueProperty, onGenreChange, currentGenre } =
    props;

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
          // className="list-group-item p-3 pe-5"
          onClick={() => onGenreChange(genre)}
        >
          {/* {console.log(classes)} */}
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

CatList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default CatList;
