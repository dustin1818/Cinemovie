import React, { useState, useEffect } from "react";

const CastCredits = ({ creditOverview, actorID, LazyLoadImage }) => {
  const [actorCredits, setActorCredits] = useState([]);

  useEffect(() => {
    const fetchActorInfo = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorID}/combined_credits?language=en-US`,
          options
        );
        if (!response.ok)
          throw new Error("Network response for Actor Credits was not ok");
        const data = await response.json();
        setActorCredits(data.cast);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchActorInfo();
  }, [actorID]);

  return (
    <>
      {creditOverview && (
        <div className="overview-details py-8">
          <div className="actors-movies-container grid gap-2 md:gap-3 lg:gap-4">
            {actorCredits.map((actor, index) => (
              <div
                className="flex flex-col rounded"
                key={index}
                // onClick={() => goToDetailsPage(actor.id)}
              >
                <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-t h-full rounded border-none ">
                  <LazyLoadImage
                    effect="blur"
                    className="w-full h-[250px] !transition !duration-300 !ease-in-out hover:!scale-105 lg:h-full rounded object-cover"
                    src={`${
                      actor?.backdrop_path === null
                        ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                        : `https://image.tmdb.org/t/p/original${actor.backdrop_path}`
                    }`}
                    alt={`https://image.tmdb.org/t/p/original${actor.backdrop_path}`}
                  />
                </div>

                <div className="description-name mt-3 text-[14px]">
                  <p className=" font-medium "> {actor.title}</p>
                  <p className="mt-1 text-zinc-300">
                    Played as:{" "}
                    {actor.character === "" ? "Self - Extra" : actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CastCredits;
