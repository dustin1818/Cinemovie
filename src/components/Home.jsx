import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";

const Home = () => {
  const [showingMovies, setShowingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
      },
    };

    let API_URL_NEW =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    let API_URL_POPULAR =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    let API_URL_TOPRATED =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    let API_URL_UPCOMING =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

    const fetchMovies = async () => {
      const response = await fetch(API_URL_NEW, options);
      const response2 = await fetch(API_URL_POPULAR, options);
      const response3 = await fetch(API_URL_TOPRATED, options);
      const response4 = await fetch(API_URL_UPCOMING, options);
      if (!response.ok)
        throw new Error("Network response for New Movies was not ok");
      if (!response2.ok)
        throw new Error("Network response for Popular Movies was not ok");
      if (!response3.ok)
        throw new Error("Network response for Top RATED Movies was not ok");
      if (!response4.ok)
        throw new Error("Network response for Upcoming Movies was not ok");
      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const data4 = await response4.json();
      setShowingMovies(data.results);
      setPopularMovies(data2.results);
      setTopRatedMovies(data3.results);
      setUpcomingMovies(data4.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="max-w-[1640px] mx-auto p-4">
      <div className="max-h-[500px] relative">
        <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
          <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            The <span className="text-red-600">Best</span>
          </h1>
          <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-red-600"> Movie </span> Website
          </h1>
        </div>
        <img
          className="w-full max-h-[500px] object-cover"
          src="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
          alt=""
        />
      </div>

      {/* Show Movies Section  */}
      <section className="mt-10">
        <h1 className="text-xl md:text-2xl mb-5">
          <span className="font-bold">Showing </span> Movies
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
            {showingMovies.map((movies) => (
              <SwiperSlide key={movies.id}>
                <img
                  className="rounded-t object-cover lg:!w-[100%]"
                  src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Popular Movies Section  */}
      <section className="mt-10">
        <h1 className="text-xl md:text-2xl mb-5">
          <span className="font-bold">Popular </span> Movies
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
                <img
                  className="rounded-t object-cover lg:!w-[100%]"
                  src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Top Rated Movies Section  */}
      <section className="mt-10">
        <h1 className="text-xl md:text-2xl mb-5">
          <span className="font-bold">Top Rated </span> Movies
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
                <img
                  className="rounded-t object-cover lg:!w-[100%]"
                  src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Upcoming Movies Section  */}
      <section className="mt-10">
        <h1 className="text-xl md:text-2xl mb-5">
          <span className="font-bold">Upcoming</span> Movies
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
                <img
                  className="rounded-t object-cover lg:!w-[100%]"
                  src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;
