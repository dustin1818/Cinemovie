import React, { useEffect, useState } from "react";
import CastCredits from "./CastCredits";
import CastPhoto from "./CastPhoto";

const CastOverview = ({
  actorInfo,
  LazyLoadImage,
  setMovieSeriesID,
  navigate,
  movieOverview,
  setMovieOverview,
  creditOverview,
  setCreditOverview,
  photosOverview,
  setPhotosOverview,
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

  //onclick function for overview
  const clickOverview = () => {
    setMovieOverview(true);
    setCreditOverview(false);
    setPhotosOverview(false);
  };
  const clickCreditOverview = () => {
    setMovieOverview(false);
    setCreditOverview(true);
    setPhotosOverview(false);
  };
  const clickPhotosOverview = () => {
    setMovieOverview(false);
    setCreditOverview(false);
    setPhotosOverview(true);
  };

  return (
    <div className="bg-zinc-900 text-white p-4 py-10 pb-0">
      <div className="flex justify-center text-center w-auto gap-7 md:gap-10 ">
        <h3
          className={
            movieOverview === true
              ? "uppercase font-semibold text-[#dc2626]"
              : "uppercase font-normal"
          }
          onClick={clickOverview}
          typeof="button"
          role="button"
        >
          Movies
        </h3>
        <h3
          className={
            creditOverview === true
              ? "uppercase font-semibold text-[#dc2626]"
              : "uppercase font-normal"
          }
          onClick={clickCreditOverview}
          typeof="button"
          role="button"
        >
          Credits
        </h3>
        <h3
          className={
            photosOverview === true
              ? "uppercase font-semibold text-[#dc2626]"
              : "uppercase font-normal"
          }
          onClick={clickPhotosOverview}
          typeof="button"
          role="button"
        >
          Photos
        </h3>
      </div>

      {movieOverview && (
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
                    className="w-full h-[250px] !transition !duration-300 !ease-in-out hover:!scale-105 lg:h-full rounded object-contain"
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
      )}

      <CastCredits
        creditOverview={creditOverview}
        actorID={actorInfo.id}
        LazyLoadImage={LazyLoadImage}
      />

      <CastPhoto
        photosOverview={photosOverview}
        actorID={actorInfo.id}
        LazyLoadImage={LazyLoadImage}
      />
    </div>
  );
};

export default CastOverview;
