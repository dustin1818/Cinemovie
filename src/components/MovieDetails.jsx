import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillPlayCircle, AiFillCaretRight } from "react-icons/ai";

const MovieDetails = ({
  toggleBtn2,
  movieseriesID,
  setMovieSeriesID,
  LazyLoadImage,
}) => {
  const [movieDetails, setMovieDetails] = useState([]);

  // get id of the URL using PARAMS
  const { id } = useParams();
  localStorage.setItem("saveMovieID", JSON.parse(id));
  const getID = localStorage.getItem("saveMovieID");
  setMovieSeriesID(getID);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };
        const API_URL = toggleBtn2
          ? `https://api.themoviedb.org/3/movie/${movieseriesID}`
          : `https://api.themoviedb.org/3/tv/${movieseriesID}`;
        const response = await fetch(API_URL, options);
        if (!response.ok)
          throw new Error("Fetching data failed for movie details");
        const data = await response.json();
        setMovieDetails(data);
      } catch (e) {
        console.log("Error", e);
      }
    }; // end of function
    fetchMovieDetails();
  }, []);

  const playTrailer = () => {
    console.log("video playing");
  };

  console.log(movieDetails);

  const numFormatter = () => {
    if (movieDetails.revenue > 999 && movieDetails.revenue < 1000000) {
      return (movieDetails.revenue / 1000)?.toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (movieDetails.revenue > 1000000) {
      return (movieDetails.revenue / 1000000)?.toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (movieDetails.revenue < 900) {
      return movieDetails.revenue; // if value < 1000, nothing to do
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="relative  flex flex-col lg:flex-row-reverse bg-black text-[#999]">
        <div className="movie-overlay relative flex flex-auto after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:block after:content-[''] ">
          <div className="h-full w-full">
            <LazyLoadImage
              effect="blur"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              alt={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              className="w-full h-full object-cover object-top md:object-center inline-block"
            />

            <div className="play-icon absolute top-0 right-0 left-0 bottom-0 h-full w-full m-auto flex justify-center items-center">
              <AiFillPlayCircle
                size={50}
                className="md:h-[80px] cursor-pointer z-[1]"
                color="rgb(220 38 38)"
                onClick={playTrailer}
                type="button"
                role="button"
              />
            </div>
          </div>
        </div>

        <div className="description relative flex flex-col p-4 md:justify-center md:after:absolute md:after:left-0 md:after:content-[''] md:after:justify-center md:after:items-center md:after:h-full md:after:w-  md:after:translate-x-[97%]">
          <div className=" max-w-full lg:max-w-[2400px]">
            <h1 className="mb-3 text-white text-2xl font-medium ">
              {movieDetails?.original_title}
            </h1>
            <div className="details flex gap-5 text-sm">
              <span>{movieDetails.vote_average?.toFixed(2)}/10</span>
              <span>{numFormatter()} Revenue</span>
              <span>{new Date(movieDetails?.release_date).getFullYear()}</span>
              <span>
                {Math.floor(movieDetails?.runtime / 60)}h{" "}
                {movieDetails?.runtime % 60}min
              </span>
            </div>
            <p className="mt-2 text-white">{movieDetails.overview}</p>
          </div>

          <div className="btn-container mr-auto mt-4 flex font-semibold items-center bg-[#dc2626] p-3 w-40 justify-center text-white rounded">
            <AiFillCaretRight size={18} />
            <button className="text-[15px]">Watch Trailer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
