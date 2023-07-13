import React from "react";

const MovieDetails = ({ toggleBtn2, movieseriesID }) => {
  return (
    <div>
      <h1>Type of this is {toggleBtn2 === true ? "Movie" : "Series"}</h1>
      <h1>Movie id is {movieseriesID}</h1>
    </div>
  );
};

export default MovieDetails;
