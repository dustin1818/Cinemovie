import { useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const OverlayPhotoOverview = ({
  isPhotosOverlay,
  setIsPhotosOverlay,
  photoID,
  setPhotoID,
  LazyLoadImage,
  photoLength,
  photoIndex,
  photoCollection,
  setPhotoCollection,
  setPhotoIndex,
}) => {
  // logic for next picture
  const nextPhoto = (e) => {
    setPhotoIndex(() => photoIndex + 1);
    setPhotoID(photoCollection[photoIndex + 1].file_path);
  };

  //logic for previous picture
  const prevPhoto = (e) => {
    if (photoIndex === 1) {
      setPhotoIndex(1);
    } else {
      setPhotoIndex(photoIndex - 1);
      setPhotoID(photoCollection[photoIndex - 1].file_path);
    }
  };

  return (
    <>
      {isPhotosOverlay && (
        <div
          className={
            isPhotosOverlay === true
              ? "overlay flex flex-col justify-center open min-h-screen bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[30] p-[20px] md:p-[120px]"
              : "overlay min-h-screen flex flex-col justify-center bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-[30] p-[20px] md:p-[120px]"
          }
        >
          <LazyLoadImage
            effect="blur"
            src={`https://image.tmdb.org/t/p/original/${photoID}`}
            alt={`https://image.tmdb.org/t/p/original/${photoID}`}
            className="w-full object-contain"
          />
          <AiOutlineClose
            className=" absolute top-[20px] right-[20px] z-20"
            size={30}
            color="#ffffff"
            onClick={() => setIsPhotosOverlay(false)}
          />

          <div className="flex justify-between items-center absolute top-0 right-0 bottom-0 left-0">
            <AiOutlineArrowLeft
              className="h-[50px] w-auto"
              onClick={(e) => prevPhoto(e)}
            />
            <AiOutlineArrowRight
              className="h-[50px]  w-auto"
              onClick={(e) => nextPhoto(e)}
            />
          </div>

          <div className="flex absolute left-0 right-0 bottom-0 mb-4 text-center w-full justify-center">
            <p>
              {photoIndex === 0 ? 1 : photoIndex}/{photoLength}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OverlayPhotoOverview;
