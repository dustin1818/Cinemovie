import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Showing from "./components/pages/Showing";
import Popular from "./components/pages/Popular";
import TopRated from "./components/pages/TopRated";
import Upcoming from "./components/pages/Upcoming";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Import Swiper React components/styles/modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
// import MiniLoader from "./components/MiniLoader";
import BigLoader from "./components/BigLoader";
import MovieDetails from "./components/MovieDetails";
import ShowingSlider from "./components/home-slider/ShowingSlider";
import PopularSlider from "./components/home-slider/PopularSlider";
import TopRatedSlider from "./components/home-slider/TopRatedSlider";
import UpcomingSlider from "./components/home-slider/UpcomingSlider";
import Cast from "./components/Cast";

function App() {
  const [moviesAPI, setMoviesAPI] = useState("movies api");
  const [seriesAPI, setSeriesAPI] = useState("series api");

  const [loading, setLoading] = useState(false);

  //Toggle Button for switching from movies to series
  const [toggleBtn2, setToggleBtn2] = useState(true);

  // FETCHING MOVIES/SERIES
  const [showingMovies, setShowingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [movieseriesID, setMovieSeriesID] = useState(0);

  // API FOR MOVIES
  let API_URL_NEW = toggleBtn2
    ? "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
    : "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";

  let API_URL_POPULAR = toggleBtn2
    ? "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    : "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";

  let API_URL_TOPRATED = toggleBtn2
    ? "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
    : "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

  let API_URL_UPCOMING = toggleBtn2
    ? "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
    : "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1";

  let options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL_NEW, options);
        if (!response.ok)
          throw new Error("Network response for New Movies/Series was not ok");
        const response2 = await fetch(API_URL_POPULAR, options);
        if (!response2.ok)
          throw new Error(
            "Network response for Popular Movies/Series was not ok"
          );
        const response3 = await fetch(API_URL_TOPRATED, options);
        if (!response3.ok)
          throw new Error(
            "Network response for Top RATED Movies/Series was not ok"
          );
        const response4 = await fetch(API_URL_UPCOMING, options);
        if (!response4.ok)
          throw new Error(
            "Network response for Upcoming Movies/Series was not ok"
          );
        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        setShowingMovies(data);
        setPopularMovies(data2);
        setTopRatedMovies(data3);
        setUpcomingMovies(data4);
      } catch (e) {
        console.log("Error Try Catch Block: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [toggleBtn2]);

  return (
    <div>
      {/* ROUTE NAVBAR  */}
      {loading ? (
        <BigLoader />
      ) : (
        <Router>
          <Navbar
            moviesAPI={moviesAPI}
            setMoviesAPI={setMoviesAPI}
            seriesAPI={seriesAPI}
            setSeriesAPI={setSeriesAPI}
            toggleBtn2={toggleBtn2}
            setToggleBtn2={setToggleBtn2}
            setLoading={setLoading}
          />
          <Routes>
            {/* ROUTE HOME  */}
            <Route
              path="/"
              element={
                <div className="max-w-[1920px] mx-auto p-4">
                  <div className="max-h-[450px] lg:max-h-[800px] relative">
                    <div className="absolute w-full h-[97%] md:h[99%] xl:h-full text-gray-200 max-h-[450px] lg:max-h-[800px] bg-black/40 flex flex-col justify-center z-[1]">
                      <h1 className="px-4 text-3xl sm:text-4xl md:text-6xl font-bold md:mb-3">
                        The <span>Best Info</span>
                      </h1>
                      <h1 className="px-4 text-3xl sm:text-4xl md:text-6xl font-bold">
                        <span className="text-red-600 mr-2">
                          Movie and Series
                        </span>
                        Website
                      </h1>
                    </div>
                    <LazyLoadImage
                      effect="blur"
                      className="w-full max-h-[450px] lg:max-h-[800px] object-cover"
                      src="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
                      alt="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
                    />
                  </div>

                  {/* Show Movies Section  */}
                  <section className="mt-6 md:mt-10">
                    {toggleBtn2 ? (
                      <h1 className="text-xl md:text-2xl mb-5">
                        <span className="font-bold">Showing</span> Movies
                      </h1>
                    ) : (
                      <h1 className="text-xl md:text-2xl mb-5">
                        <span className="font-bold">Airing Today</span> Series
                      </h1>
                    )}
                    <div className="flex flex-row w-100 md:w-100">
                      <ShowingSlider
                        showingMovies={showingMovies}
                        setMovieSeriesID={setMovieSeriesID}
                        LazyLoadImage={LazyLoadImage}
                        Swiper={Swiper}
                        SwiperSlide={SwiperSlide}
                        Scrollbar={Scrollbar}
                        useNavigate={useNavigate}
                      />
                    </div>
                  </section>

                  {/* Popular Movies Section  */}
                  <section className="mt-6 md:mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      <span className="font-bold">Popular </span>{" "}
                      {toggleBtn2 ? "Movies" : "Series"}
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <PopularSlider
                        popularMovies={popularMovies}
                        setMovieSeriesID={setMovieSeriesID}
                        LazyLoadImage={LazyLoadImage}
                        Swiper={Swiper}
                        SwiperSlide={SwiperSlide}
                        Scrollbar={Scrollbar}
                        useNavigate={useNavigate}
                      />
                    </div>
                  </section>

                  {/* Top Rated Movies Section  */}
                  <section className="mt-6 md:mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      <span className="font-bold">Top Rated </span>{" "}
                      {toggleBtn2 ? "Movies" : "Series"}
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <TopRatedSlider
                        topRatedMovies={topRatedMovies}
                        setMovieSeriesID={setMovieSeriesID}
                        LazyLoadImage={LazyLoadImage}
                        Swiper={Swiper}
                        SwiperSlide={SwiperSlide}
                        Scrollbar={Scrollbar}
                        useNavigate={useNavigate}
                      />
                    </div>
                  </section>

                  {/* Upcoming Movies Section  */}
                  <section className="mt-6 md:mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      {toggleBtn2 ? (
                        <h1 className="text-xl md:text-2xl mb-5">
                          <span className="font-bold ">Upcoming</span> Movies
                        </h1>
                      ) : (
                        <h1 className="text-xl md:text-2xl mb-5">
                          <span className="font-bold">On the Air</span> Series
                        </h1>
                      )}
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <UpcomingSlider
                        upcomingMovies={upcomingMovies}
                        setMovieSeriesID={setMovieSeriesID}
                        LazyLoadImage={LazyLoadImage}
                        Swiper={Swiper}
                        SwiperSlide={SwiperSlide}
                        Scrollbar={Scrollbar}
                        useNavigate={useNavigate}
                      />
                    </div>
                  </section>
                </div>
              }
            />
            {/* ROUTES  */}
            <Route
              path="/showing"
              element={
                <Showing
                  options={options}
                  toggleBtn2={toggleBtn2}
                  useNavigate={useNavigate}
                  setMovieSeriesID={setMovieSeriesID}
                  LazyLoadImage={LazyLoadImage}
                />
              }
            />
            <Route
              path="/popular"
              element={
                <Popular
                  options={options}
                  toggleBtn2={toggleBtn2}
                  useNavigate={useNavigate}
                  setMovieSeriesID={setMovieSeriesID}
                  LazyLoadImage={LazyLoadImage}
                />
              }
            />
            <Route
              path="/toprated"
              element={
                <TopRated
                  options={options}
                  toggleBtn2={toggleBtn2}
                  useNavigate={useNavigate}
                  setMovieSeriesID={setMovieSeriesID}
                  LazyLoadImage={LazyLoadImage}
                />
              }
            />
            <Route
              path="/upcoming"
              element={
                <Upcoming
                  options={options}
                  toggleBtn2={toggleBtn2}
                  useNavigate={useNavigate}
                  setMovieSeriesID={setMovieSeriesID}
                  LazyLoadImage={LazyLoadImage}
                />
              }
            />
            <Route
              path="/info/:id"
              element={
                <MovieDetails
                  toggleBtn2={toggleBtn2}
                  movieseriesID={movieseriesID}
                  setMovieSeriesID={setMovieSeriesID}
                  LazyLoadImage={LazyLoadImage}
                  Swiper={Swiper}
                  SwiperSlide={SwiperSlide}
                  Scrollbar={Scrollbar}
                />
              }
            />
            <Route
              path="/person/:id"
              element={
                <Cast
                  toggleBtn2={toggleBtn2}
                  LazyLoadImage={LazyLoadImage}
                  useParams={useParams}
                />
              }
            />
            <Route path="*" element={<h1>Page Not Found!</h1>} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
