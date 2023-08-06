import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoOverview = ({ videoOverview, toggleBtn2 }) => {
  const [videoCollection, setVideoCollection] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchMovieVideos = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };
        const API_URL = toggleBtn2
          ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
          : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

        const response = await fetch(API_URL, options);
        const data = await response.json();
        setVideoCollection(data.results);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchMovieVideos();
  }, [id, toggleBtn2]);

  console.log(videoCollection.length);

  return (
    <>
      {videoOverview && (
        <div className="mt-20 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videoCollection?.map((video) => (
            <div className="h-[300px] lg:h-[450px]">
              <iframe
                loading="lazy"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}

      {videoOverview && videoCollection.length === 0 && (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-4xl font-medium border-solid border-2 border-red-400 p-10 rounded">
            No Videos
          </h1>
        </div>
      )}
    </>
  );
};

export default VideoOverview;
