import React, { useEffect } from "react";
import { useState } from "react";
import CastOverview from "./cast-pages/CastOverview";

const Cast = ({
  toggleBtn2,
  LazyLoadImage,
  useParams,
  setMovieSeriesID,
  useNavigate,
}) => {
  const [actorInfo, setActorInfo] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

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
          `https://api.themoviedb.org/3/person/${id}`,
          options
        );
        if (!response.ok)
          throw new Error("Network response for Actor Infor was not ok");
        const data = await response.json();
        setActorInfo(data);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchActorInfo();
  }, []);
  console.log(actorInfo);

  const dateBorn = new Date(actorInfo?.birthday);
  const today = new Date();
  const ageActor = today.getFullYear() - dateBorn.getFullYear();

  const formattedDate = dateBorn.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-[1920px] mx-auto p-4 py-8 bg-zinc-900 text-white h-full">
      <h2 className="font-medium md:text-xl mb-4">{actorInfo?.name}</h2>
      <div className="flex flex-col">
        <div className="block lg:flex">
          <div className="img-container inline-block float-left w-[40%] max-w-[200px] mr-3 mb-1 ">
            <LazyLoadImage
              effect="blur"
              src={`https://image.tmdb.org/t/p/original/${actorInfo.profile_path}`}
              alt={`https://image.tmdb.org/t/p/original/${actorInfo.profile_path}`}
              className="w-full h-full object-cover object-top inline-block "
            />
          </div>

          <div className="right-container">
            <div className="desc-container">
              <p className=" whitespace-pre-line text-[14px]">
                {actorInfo?.biography}
              </p>
            </div>

            <div className="block mt-5">
              <div className="flex text-[14px]">
                <p className="flex-[1] max-w-[90px] mr-4">Known For</p>
                <p className="flex-[2]">{actorInfo?.known_for_department}</p>
              </div>
              <div className="flex text-[14px] mt-2">
                <p className="flex-[1] max-w-[90px] mr-4">Born</p>
                <p className="flex-[2]">{`${formattedDate} (age ${ageActor})`}</p>
              </div>
              <div className="flex text-[14px] mt-2">
                <p className="flex-[1] max-w-[90px] mr-4">Birthplace</p>
                <p className="flex-[2]">{actorInfo?.place_of_birth}</p>
              </div>
            </div>
          </div>
        </div>

        <CastOverview
          actorInfo={actorInfo}
          LazyLoadImage={LazyLoadImage}
          setMovieSeriesID={setMovieSeriesID}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Cast;
