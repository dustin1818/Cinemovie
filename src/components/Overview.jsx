import React from "react";

const Overview = ({ movieDetails, movieCast }) => {
  //   console.log(movieDetails);
  //   console.log(movieCast);

  const fetchMovieDirector = () => {
    let director = "";
    movieCast.crew?.map((casts) => {
      if (casts["job"] === "Director") director = casts.name;
    });
    return director;
  };

  return (
    <div className="bg-zinc-900 text-white p-4">
      <div className="flex justify-between ">
        <h3 className="uppercase font-medium">Overview</h3>
        <h3 className="uppercase font-medium">Videos</h3>
        <h3 className="uppercase font-medium">Photos</h3>
      </div>

      <div className="overview-details py-10">
        <p className="mb-5">Storyline</p>
        <p>{movieDetails.overview}</p>

        <div className="overview-details-info w-[280px] mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="w-[47%]">
              <p>Released</p>
            </div>
            <div className=" w-[47%]">
              <p>{new Date(movieDetails?.release_date).getFullYear()}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[47%]">
              <p>Runtime</p>
            </div>
            <div className=" w-[47%]">
              {Math.floor(movieDetails?.runtime / 60)}h{" "}
              {movieDetails?.runtime % 60}min{" "}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[47%]">
              <p>Director</p>
            </div>
            <div className=" w-[47%]">
              <p>{fetchMovieDirector()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
