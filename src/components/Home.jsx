import React, { useEffect, useState } from "react";

const Home = () => {
  const [showingMovies, setShowingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
      },
    };

    let API_URL =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    const fetchMovies = async () => {
      const response = await fetch(API_URL, options);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setShowingMovies(data.results);
    };
    fetchMovies();
  }, []);

  console.log(showingMovies);

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
          className="w-full max-h-[300px] object-cover"
          src="https://images.pexels.com/photos/8263349/pexels-photo-8263349.jpeg"
          alt=""
        />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl sm:text-3xl mb-5">
          <span className="font-bold">Showing </span> Movies
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {showingMovies.map((movies, index) => (
            <div
              className="flex flex-col gap-3 bg-white shadow-md rounded"
              key={index}
            >
              <div className="w-100 rounded">
                <img
                  className="rounded-t object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                />
              </div>

              <div className="px-4 py-2">
                <h1 className="font-bold mb-3">{movies.original_title}</h1>
                <p>{movies.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
