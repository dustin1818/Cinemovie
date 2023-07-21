import React from "react";

const Overview = ({ movieDetails, movieCast, numFormatter, LazyLoadImage }) => {
  const fetchMovieDirector = () => {
    let director = "";
    movieCast.crew?.map((casts) => {
      if (casts["job"] === "Director") director = casts.name;
    });
    return director;
  };
  console.log(movieDetails);

  const numFormatter2 = () => {
    if (movieDetails.budget > 999 && movieDetails.budget < 1000000) {
      return (movieDetails.budget / 1000)?.toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (movieDetails.budget > 1000000) {
      return (movieDetails.budget / 1000000)?.toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (movieDetails.budget < 900) {
      return movieDetails.budget; // if value < 1000, nothing to do
    }
  };
  return (
    <div className="bg-zinc-900 text-white p-4 py-10">
      <div className="flex justify-center text-center w-auto gap-10 ">
        <h3 className="uppercase font-medium">Overview</h3>
        <h3 className="uppercase font-medium">Videos</h3>
        <h3 className="uppercase font-medium">Photos</h3>
      </div>

      <div className="overview-details py-8">
        <div className="flex w-full">
          <div className="hidden lg:flex">
            <LazyLoadImage
              effect="blur"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
              alt={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
              className="w-[300px] h-full object-contain object-top lg:object-top inline-block "
            />
          </div>

          <div className="flex flex-col lg:ml-10 w-full lg:w-[1050px]">
            <p className="mb-2 text-3xl font-medium">Storyline</p>
            <p className="mb-5">{movieDetails.overview}</p>

            <div className="overview-details-info mt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Released:</p>
                </div>
                <div className="w-[87%]">
                  <p>{new Date(movieDetails?.release_date).getFullYear()}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Runtime:</p>
                </div>
                <div className="w-[87%]">
                  {Math.floor(movieDetails?.runtime / 60)}h{" "}
                  {movieDetails?.runtime % 60}min{" "}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Director:</p>
                </div>
                <div className="w-[87%]">
                  <p>{fetchMovieDirector()}</p>
                </div>
              </div>
              <div
                className={
                  numFormatter === 0 ? "hidden" : "flex justify-between"
                }
              >
                <div className="w-[20%]">
                  <p>Revenue:</p>
                </div>
                <div className="w-[87%]">
                  <p>{numFormatter === 0 ? null : `$${numFormatter}`}</p>
                </div>
              </div>
              <div
                className={
                  numFormatter2 === 0 ? "hidden" : "flex justify-between"
                }
              >
                <div className="w-[20%]">
                  <p>Budget:</p>
                </div>
                <div className="w-[87%]">
                  <p>{numFormatter2 === 0 ? null : `$${numFormatter2()}`}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Genre:</p>
                </div>
                <div className="w-[87%]">
                  <p>
                    {movieDetails.genres
                      ?.map((genre) => `${genre.name}`)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Status:</p>
                </div>
                <div className="w-[87%]">
                  <p>{movieDetails.status}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Language:</p>
                </div>
                <div className="w-[87%]">
                  <p>
                    {movieDetails.spoken_languages
                      ?.map((language) => `${language.english_name}`)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[20%]">
                  <p>Production:</p>
                </div>
                <div className="w-[87%]">
                  <p>
                    {" "}
                    {movieDetails.production_companies
                      ?.map((company) => `${company.name}`)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
