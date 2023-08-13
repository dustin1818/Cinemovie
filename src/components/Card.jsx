import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ newMovie, goToDetailsPage }) => {
  return (
    <>
      {newMovie.results?.map((movies) => (
        <div
          className="flex flex-col rounded"
          key={movies.id}
          onClick={() => goToDetailsPage(movies.id)}
        >
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
            <LazyLoadImage
              effect="blur"
              className="max-w-full !transition !duration-300 !ease-in-out hover:!scale-105 h-[160px] lg:h-full rounded object-contain"
              src={
                movies.poster_path === null
                  ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                  : `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
              }
              alt={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
