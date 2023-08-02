import React, { useEffect, useState } from "react";

const CastOverview = ({
  actorInfo,
  LazyLoadImage,
  setMovieSeriesID,
  navigate,
}) => {
  const [actorShows, setActorShows] = useState([]);

  const goToDetailsPage = (id) => {
    setMovieSeriesID(id);
    navigate(`/info/${id}`);
  };

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
        let API_NEW_POPULAR = `https://api.themoviedb.org/3/person/${actorInfo.id}/movie_credits`;
        const response = await fetch(API_NEW_POPULAR, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setActorShows(data.cast);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchShows();
  }, [actorInfo]);

  console.log(actorShows);

  return (
    <div className="bg-zinc-900 text-white p-4 py-10 pb-0">
      <div className="flex justify-center text-center w-auto gap-10 ">
        <h3 className="uppercase font-medium">Overview</h3>
        <h3 className="uppercase font-medium">Videos</h3>
        <h3 className="uppercase font-medium">Photos</h3>
      </div>

      <div className="overview-details py-8">
        <div className="actors-movies-container grid gap-2 md:gap-3 lg:gap-4">
          {actorShows.map((shows, index) => (
            <div
              className="flex flex-col rounded"
              key={index}
              onClick={() => goToDetailsPage(shows.id)}
            >
              <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
                <LazyLoadImage
                  effect="blur"
                  className="max-w-xs h-[250px] !transition !duration-300 !ease-in-out hover:!scale-105 lg:h-full rounded object-contain"
                  src={`${
                    shows.poster_path === null
                      ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                      : `https://image.tmdb.org/t/p/w500/${shows.poster_path}`
                  }`}
                  alt={`https://image.tmdb.org/t/p/w500/${shows.poster_path}`}
                />
              </div>

              <div className="description-name mt-3 text-[14px]">
                <p className="font-medium ">{shows.title}</p>
                <p className=" text-zinc-300">
                  {Math.floor(shows.vote_average * 10) / 10} / 10
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastOverview;
