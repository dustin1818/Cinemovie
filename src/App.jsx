import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Trending from "./components/pages/Trending";
import Showing from "./components/pages/Showing";
import Popular from "./components/pages/Popular";
import TopRated from "./components/pages/TopRated";
import Upcoming from "./components/pages/Upcoming";

import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";

// Import Swiper React components/styles/modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MiniLoader from "./components/MiniLoader";
import BigLoader from "./components/BigLoader";

function App() {
  //Update API STATE TO MOVIE OR SERIES
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
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
      },
    };

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

    let API_URL_TRENDING = toggleBtn2
      ? "https://api.themoviedb.org/3/trending/all/day?language=en-US"
      : "https://api.themoviedb.org/3/trending/all/day?language=en-US";

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL_NEW, options);
        const response2 = await fetch(API_URL_POPULAR, options);
        const response3 = await fetch(API_URL_TOPRATED, options);
        const response4 = await fetch(API_URL_UPCOMING, options);
        const response5 = await fetch(API_URL_TRENDING, options);
        if (!response.ok)
          throw new Error("Network response for New Movies/Series was not ok");
        if (!response2.ok)
          throw new Error(
            "Network response for Popular Movies/Series was not ok"
          );
        if (!response3.ok)
          throw new Error(
            "Network response for Top RATED Movies/Series was not ok"
          );
        if (!response4.ok)
          throw new Error(
            "Network response for Upcoming Movies/Series was not ok"
          );
        if (!response5.ok)
          throw new Error(
            "Network response for Trending Movies/Series was not ok"
          );
        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        const data5 = await response5.json();
        setShowingMovies(data.results);
        setPopularMovies(data2.results);
        setTopRatedMovies(data3.results);
        setUpcomingMovies(data4.results);
        setTrendingMovies(data5.results);
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
                  <div className="max-h-[500px] relative">
                    <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
                      <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                        The <span>Best Info</span>
                      </h1>
                      <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl font-bold">
                        <span className="text-red-600"> Movie and Series </span>{" "}
                        Website
                      </h1>
                    </div>
                    <img
                      className="w-full max-h-[500px] object-cover"
                      src="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
                      alt="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
                    />
                  </div>

                  {/* Show Movies Section  */}
                  <section className="mt-10">
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
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={35}
                        breakpoints={{
                          320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                          },
                        }}
                        scrollbar={{
                          hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                      >
                        {showingMovies.map((movies) => (
                          <SwiperSlide key={movies.id}>
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full w-full">
                              <img
                                className="max-w-xs transition duration-300 ease-in-out hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                                alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </section>

                  {/* Popular Movies Section  */}
                  <section className="mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      <span className="font-bold">Popular </span>{" "}
                      {toggleBtn2 ? "Movies" : "Series"}
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={35}
                        breakpoints={{
                          320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                          },
                        }}
                        scrollbar={{
                          hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                      >
                        {popularMovies.map((movies) => (
                          <SwiperSlide key={movies.id}>
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full w-full">
                              <img
                                className="max-w-xs transition duration-300 ease-in-out hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                                alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </section>

                  {/* Top Rated Movies Section  */}
                  <section className="mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      <span className="font-bold">Top Rated </span>{" "}
                      {toggleBtn2 ? "Movies" : "Series"}
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={35}
                        breakpoints={{
                          320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                          },
                        }}
                        scrollbar={{
                          hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                      >
                        {topRatedMovies.map((movies) => (
                          <SwiperSlide key={movies.id}>
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full w-full">
                              <img
                                className="max-w-xs transition duration-300 ease-in-out hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                                alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </section>

                  {/* Upcoming Movies Section  */}
                  <section className="mt-10">
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
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={35}
                        breakpoints={{
                          320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                          },
                        }}
                        scrollbar={{
                          hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                      >
                        {upcomingMovies.map((movies) => (
                          <SwiperSlide key={movies.id}>
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full w-full">
                              <img
                                className="max-w-xs transition duration-300 ease-in-out hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                                alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </section>

                  {/* Trending Movies/Series Section  */}
                  <section className="mt-10">
                    <h1 className="text-xl md:text-2xl mb-5">
                      <h1 className="text-xl md:text-2xl mb-5">
                        <span className="font-bold ">Trending</span> Today
                      </h1>
                    </h1>
                    <div className="flex flex-row w-100 md:w-100">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={35}
                        breakpoints={{
                          320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                          },
                        }}
                        scrollbar={{
                          hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                      >
                        {trendingMovies.map((movies) => (
                          <SwiperSlide key={movies.id}>
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full w-full">
                              <img
                                className="max-w-xs transition duration-300 ease-in-out hover:scale-105"
                                src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                                alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </section>
                </div>
              }
            />
            {/* ROUTE TRENDING  */}
            <Route path="/showing" element={<Showing />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="*" element={<h1>Page Not Found!</h1>} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
