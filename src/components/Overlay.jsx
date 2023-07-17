import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Overlay = ({ isOverlayVisible, setIsOverlayVisible, videoId }) => {
  console.log(videoId);
  const [youtubeID, setYoutubeID] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${videoId}/videos`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Fetch Videos for youtube failed");
        const data = await response.json();
        data.results?.map((video) => {
          if (video.type === "Trailer" && video.name === "Official Trailer") {
            setYoutubeID(video.key);
          }
        });
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchTrailer();
  }, [videoId]);
  // console.log(youtubeID);
  return (
    <>
      {isOverlayVisible && (
        <div
          className={
            isOverlayVisible === true
              ? "overlay flex flex-col justify-center open min-h-screen bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[1] p-[20px] md:p-[120px]"
              : "overlay min-h-screen flex flex-col justify-center bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[1] p-[20px] md:p-[120px]"
          }
        >
          <AiOutlineClose
            className=" absolute top-[20px] right-[20px]"
            size={30}
            color="#ffffff"
            onClick={() => setIsOverlayVisible(false)}
          />
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeID}`}
            title=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="youtubeVid"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Overlay;
