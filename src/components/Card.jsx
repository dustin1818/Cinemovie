import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ newPopularMovie }) => {
  return (
    <>
      {newPopularMovie.results?.map((movies, index) => (
        <div className="flex flex-col rounded" key={index}>
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
            <LazyLoadImage
              effect="blur"
              className="max-w-xs transition duration-300 ease-in-out hover:scale-105 h-[160px] lg:h-full rounded"
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              alt={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
