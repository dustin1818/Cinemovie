import React from "react";
import CastSlider from "./CastSlider";

const Overview = ({
  movieDetails,
  movieCast,
  numFormatter,
  LazyLoadImage,
  toggleBtn2,
  Swiper,
  SwiperSlide,
  Scrollbar,
}) => {
  const fetchMovieDirector = () => {
    let director = "";
    if (toggleBtn2 === true) {
      movieCast.crew?.map((casts) => {
        if (casts["job"] === "Director") director = casts.name;
      });
    } else {
      movieCast.crew?.map((casts) => {
        if (casts["job"] === "Director") {
          director = casts.name;
        } else if (casts["known_for_department"] === "Writing") {
          director = casts.name;
        }
      });
    }
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
        <div className="flex flex-col w-full">
          {toggleBtn2 === true ? (
            <div className="flex flex-row">
              <div className="hidden lg:flex">
                <LazyLoadImage
                  effect="blur"
                  src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                  alt={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                  className="w-[300px] h-full object-contain object-top lg:object-top inline-block "
                />
              </div>

              <div className="flex flex-col lg:ml-10 w-full lg:w-[1050px]">
                <p className="mb-2 text-2xl md:text-3xl font-medium">
                  Storyline
                </p>
                <p className="mb-5">{movieDetails.overview}</p>

                <div className="overview-details-info mt-4 flex flex-col gap-2">
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Released:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {new Date(movieDetails?.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Runtime:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      {Math.floor(movieDetails?.runtime / 60)}h{" "}
                      {movieDetails?.runtime % 60 > 60
                        ? `${movieDetails?.runtime % 60} min`
                        : `${movieDetails?.runtime % 60} sec`}
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Director:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{fetchMovieDirector()}</p>
                    </div>
                  </div>
                  <div
                    className={numFormatter === 0 ? "hidden" : "flex flex-wrap"}
                  >
                    <div className="w-[20%] md:w-[12%]">
                      <p>Revenue:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{numFormatter === 0 ? null : `$${numFormatter}`}</p>
                    </div>
                  </div>
                  <div
                    className={
                      numFormatter2 === 0 ? "hidden" : "flex flex-wrap"
                    }
                  >
                    <div className="w-[20%] md:w-[12%]">
                      <p>Budget:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {numFormatter2 === 0 ? null : `$${numFormatter2()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Genre:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {movieDetails.genres
                          ?.map((genre) => `${genre.name}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Status:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{movieDetails.status}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Language:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {movieDetails.spoken_languages
                          ?.map((language) => `${language.english_name}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Production:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
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
          ) : (
            <div className="flex flex-row">
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
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Released:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {new Date(movieDetails?.first_air_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Runtime:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      {Math.floor(movieDetails?.episode_run_time / 60) === 0
                        ? null
                        : `${Math.floor(movieDetails?.episode_run_time / 60)}h`}
                      {movieDetails?.episode_run_time % 60 > 60
                        ? `${movieDetails?.episode_run_time % 60} min`
                        : `${movieDetails?.episode_run_time % 60} sec`}
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Director:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{fetchMovieDirector()}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>
                        {movieDetails.number_of_seasons > 1
                          ? "Seasons"
                          : "Season"}
                      </p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{movieDetails.number_of_seasons}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>
                        {movieDetails.number_of_episodes > 1
                          ? "Episodes"
                          : "Episode"}
                      </p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{movieDetails.number_of_episodes}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Genre:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {movieDetails.genres
                          ?.map((genre) => `${genre.name}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Status:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>{movieDetails.status}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Language:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
                      <p>
                        {movieDetails.spoken_languages
                          ?.map((language) => `${language.english_name}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-[20%] md:w-[12%]">
                      <p>Production:</p>
                    </div>
                    <div className="w-[71%] md:w-[78%]">
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
          )}

          <h2 className=" text-xl my-5 font-medium">Cast</h2>
          <CastSlider
            movieCast={movieCast}
            Swiper={Swiper}
            SwiperSlide={SwiperSlide}
            Scrollbar={Scrollbar}
            toggleBtn2={toggleBtn2}
            LazyLoadImage={LazyLoadImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
