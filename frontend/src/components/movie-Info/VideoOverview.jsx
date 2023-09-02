import React, { useEffect, useState } from "react";
import OverlayVidOverview from "./OverlayVidOverview";

const VideoOverview = ({ videoOverview, toggleBtn2, movieseriesID }) => {
  const [videoCollection, setVideoCollection] = useState([]);
  //state for overlay
  const [isOverlayVisible2, setIsOverlayVisible2] = useState(false);
  const [youtubeID, SetYoutubeID] = useState("");

  //state for filtering data
  const [selectedData, setSelectedData] = useState("");

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
          ? `https://api.themoviedb.org/3/movie/${movieseriesID}/videos?language=en-US`
          : `https://api.themoviedb.org/3/tv/${movieseriesID}/videos?language=en-US`;

        const response = await fetch(API_URL, options);
        const data = await response.json();
        console.log(data);
        setVideoCollection(data.results);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchMovieVideos();
  }, [movieseriesID, toggleBtn2]);

  const openOverlay = (e) => {
    SetYoutubeID(e);
    setIsOverlayVisible2(true);
  };

  const handleChange = (e) => {
    setSelectedData(e.target.value);
  };

  const filteredData =
    selectedData === "All"
      ? videoCollection
      : videoCollection.filter((videos) => videos.type === selectedData);

  return (
    <>
      {videoOverview && (
        <div className="block mt-5">
          <select
            className=" text-slate-900 bg-white p-1 rounded"
            value={selectedData}
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="Teaser">Teaser</option>
            <option value="Clip">Clip</option>
            <option value="Featurette">Featurette</option>
          </select>
          <div className="mt-5 md:mt-20 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {selectedData === "" &&
              videoCollection?.map((video, index) => (
                <div className="h-[300px] lg:h-[450px] relative" key={index}>
                  <div
                    className="absolute top-0 right-0 left-0 bottom-0 h-full w-full bg-[#ff000000] m-auto z-20 md:z-0"
                    onClick={() => openOverlay(video.key)}
                  />
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
            {filteredData?.map((video, index) => (
              <div className="h-[300px] lg:h-[450px] relative" key={index}>
                <div
                  className="absolute top-0 right-0 left-0 bottom-0 h-full w-full bg-[#ff000000] m-auto z-20 md:z-0"
                  onClick={() => openOverlay(video.key)}
                />
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
        </div>
      )}

      {videoOverview && videoCollection.length === 0 && (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-4xl font-medium border-solid border-2 border-red-400 p-10 rounded">
            No Videos
          </h1>
        </div>
      )}

      <OverlayVidOverview
        isOverlayVisible2={isOverlayVisible2}
        setIsOverlayVisible2={setIsOverlayVisible2}
        youtubeID={youtubeID}
      />
    </>
  );
};

export default VideoOverview;
