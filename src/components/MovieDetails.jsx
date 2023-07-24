import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillPlayCircle, AiFillCaretRight } from "react-icons/ai";
import Overlay from "./Overlay";
import Overview from "./Overview";

const MovieDetails = ({
  toggleBtn2,
  movieseriesID,
  setMovieSeriesID,
  LazyLoadImage,
  Swiper,
  SwiperSlide,
  Scrollbar,
}) => {
  //state for storing movie information
  const [movieDetails, setMovieDetails] = useState([]);

  //state for overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  //state for movie casts
  const [movieCast, setMovieCast] = useState([]);

  //state for movie recommendations
  const [recommendations, setRecommendations] = useState([]);

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

    const fetchMovieCasts = async () => {
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
          ? `https://api.themoviedb.org/3/movie/${movieseriesID}/credits`
          : `https://api.themoviedb.org/3/tv/${movieseriesID}/credits`;
        const response = await fetch(API_URL, options);
        if (!response.ok)
          throw new Error("Fetching data failed for movie casts");
        const data = await response.json();
        setMovieCast(data);
      } catch (e) {
        console.log("Error", e);
      }
    }; // end of function
    fetchMovieCasts();

    const fetchMovieRecommendations = async () => {
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
          ? `https://api.themoviedb.org/3/movie/${movieseriesID}/recommendations`
          : `https://api.themoviedb.org/3/tv/${movieseriesID}/recommendations`;
        const response = await fetch(API_URL, options);
        if (!response.ok)
          throw new Error("Fetching data failed for movie recommendations");
        const data = await response.json();
        setRecommendations(data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchMovieRecommendations();
  }, []);

  const numFormatter = () => {
    if (movieDetails.revenue > 999 && movieDetails.revenue < 1000000) {
      return (movieDetails.revenue / 1000)?.toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (movieDetails.revenue > 1000000) {
      return (movieDetails.revenue / 1000000)?.toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (movieDetails.revenue < 900) {
      return movieDetails.revenue; // if value < 1000, nothing to do
    }
  };

  const playTrailer = () => {
    setIsOverlayVisible(true);
  };

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="flex flex-col lg:flex-row-reverse bg-black text-[#999]">
        <div className="movie-overlay relative flex flex-auto after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:block after:content-[''] ">
          <div className="h-full w-full">
            <LazyLoadImage
              effect="blur"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              alt={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              className="w-full h-full object-cover object-top md:object-center inline-block "
            />

            <div className="play-icon absolute top-0 right-0 left-0 bottom-0 h-full w-full m-auto flex justify-center items-center">
              <AiFillPlayCircle
                size={50}
                className="md:h-[80px] lg:hidden cursor-pointer z-[1]"
                color="rgb(220 38 38)"
                onClick={playTrailer}
                role="button"
              />
            </div>
          </div>
        </div>

        <div className="description relative flex flex-col p-4 lg:justify-center after:hidden lg:after:absolute after:left-0 after:right-0 after:bottom-0 after:top-0 after:content-[''] after:justify-center after:items-center after:h-full after:w-full lg:after:translate-x-[97%] lg:w-[2400px]">
          <div className=" max-w-full lg:max-w-[2400px]">
            {toggleBtn2 === true ? (
              <>
                <h1 className="mb-3 text-white text-xl md:text-2xl  font-medium ">
                  {movieDetails?.title}
                </h1>
                <div className="details flex text-sm">
                  <span className="mr-2">
                    {movieDetails.vote_average?.toFixed(1)}/10
                  </span>
                  <span className={numFormatter() === 0 ? null : `mr-2`}>
                    {numFormatter() === 0 ? null : `$${numFormatter()}`}
                  </span>
                  <span className="mr-2">
                    {new Date(movieDetails?.release_date).getFullYear()}
                  </span>
                  <span className="mr-2">
                    {Math.floor(movieDetails?.runtime / 60)}h{" "}
                    {movieDetails?.runtime % 60}min
                  </span>
                  <span>
                    {movieDetails?.adult === true ? "PG-18" : "PG-13"}
                  </span>
                </div>
                <p className="mt-2 text-white hidden md:block">
                  {movieDetails.overview}
                </p>
              </>
            ) : (
              <>
                <h1 className="mb-3 text-white text-2xl font-medium ">
                  {movieDetails?.name}
                </h1>
                <div className="details flex text-sm">
                  <span className="mr-2">
                    {movieDetails.vote_average?.toFixed(1)}/10
                  </span>
                  <span className="mr-2">
                    {" "}
                    {movieDetails?.number_of_seasons > 1
                      ? movieDetails?.number_of_seasons + " seasons"
                      : movieDetails?.number_of_seasons + " season"}
                  </span>
                  <span className="mr-2">
                    {new Date(movieDetails?.first_air_date).getFullYear()}
                  </span>
                  <span className="mr-2">
                    {movieDetails?.number_of_episodes} episodes
                  </span>
                  <span>
                    {movieDetails?.adult === true ? "PG-18" : "PG-13"}
                  </span>
                </div>
                <p className="mt-2 text-white">{movieDetails.overview}</p>
              </>
            )}
            <div className="btn-container mr-auto mt-4 font-semibold items-center bg-[#dc2626] p-3 w-40 justify-center text-white rounded hidden lg:flex">
              <AiFillCaretRight size={18} />
              <button className="text-[15px]" onClick={playTrailer}>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Overlay
        isOverlayVisible={isOverlayVisible}
        setIsOverlayVisible={setIsOverlayVisible}
        videoId={movieDetails.id}
        toggleBtn2={toggleBtn2}
      />

      <Overview
        movieDetails={movieDetails}
        movieCast={movieCast}
        numFormatter={numFormatter()}
        LazyLoadImage={LazyLoadImage}
        toggleBtn2={toggleBtn2}
        Swiper={Swiper}
        SwiperSlide={SwiperSlide}
        Scrollbar={Scrollbar}
        recommendations={recommendations}
      />
    </div>
  );
};

export default MovieDetails;
