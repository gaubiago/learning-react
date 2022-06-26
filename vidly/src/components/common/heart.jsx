import React from "react";

const Heart = (props) => {
  let heartClass = "fa fa-heart";
  if (!props.movie.fullHeart) heartClass += "-o";
  return (
    <i
      className={heartClass}
      aria-hidden="true"
      onClick={() => props.onHeartClick(props.movie)}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Heart;
