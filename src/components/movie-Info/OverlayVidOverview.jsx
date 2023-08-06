import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const OverlayVidOverview = ({
  isOverlayVisible2,
  setIsOverlayVisible2,
  youtubeID,
}) => {
  return (
    <>
      {isOverlayVisible2 && (
        <div
          className={
            isOverlayVisible2 === true
              ? "overlay flex flex-col justify-center open min-h-screen bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[30] p-[20px] md:p-[120px]"
              : "overlay min-h-screen flex flex-col justify-center bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[30] p-[20px] md:p-[120px]"
          }
        >
          <AiOutlineClose
            className=" absolute top-[20px] right-[20px]"
            size={30}
            color="#ffffff"
            onClick={() => setIsOverlayVisible2(false)}
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

export default OverlayVidOverview;
