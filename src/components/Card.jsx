import React from "react";

const Card = ({ newPopularMovie }) => {
  return (
    <>
      {newPopularMovie.results?.map((movies, index) => (
        <div className="flex flex-col rounded" key={index}>
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
            <img
              className="max-w-xs transition duration-300 ease-in-out hover:scale-105 h-[180px] lg:h-full rounded"
              src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
              alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
