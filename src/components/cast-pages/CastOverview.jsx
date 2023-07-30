import React, { useEffect, useState } from "react";

const CastOverview = ({ actorInfo, LazyLoadImage }) => {
  const [actorShows, setActorShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };
        let API_NEW_POPULAR =
          `https://api.themoviedb.org/3/person/${actorInfo.id}/movie_credits` &&
          `https://api.themoviedb.org/3/person/${actorInfo.id}/tv_credits`;
        const response = await fetch(API_NEW_POPULAR, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setActorShows(data.cast);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchShows();
  });

  return (
    <div className="bg-zinc-900 text-white p-4 py-10 pb-0">
      <div className="flex justify-center text-center w-auto gap-10 ">
        <h3 className="uppercase font-medium">Overview</h3>
        <h3 className="uppercase font-medium">Videos</h3>
        <h3 className="uppercase font-medium">Photos</h3>
      </div>

      <div className="overview-details py-8">
        <div className="movie-container grid gap-2 md:gap-3 lg:gap-4">
          {actorShows.map((shows) => (
            <div
              className="flex flex-col rounded"
              key={shows.id}
              // onClick={() => goToDetailsPage(movies.id)}
            >
              <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
                <LazyLoadImage
                  effect="blur"
                  className="max-w-xs !transition !duration-300 !ease-in-out hover:!scale-105 h-[160px] lg:h-full rounded"
                  src={`https://image.tmdb.org/t/p/w500/${shows.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/w500/${shows.poster_path}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastOverview;
