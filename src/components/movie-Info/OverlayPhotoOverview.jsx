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
}) => {
  // logic for next picture
  // const nextPhoto = (e) => {
  //   console.log('next page', e)
  //   console.log(photoCollection[e - 1] , 'next photo array')
  // }

  //logic for previous picture
  // const prevPhoto = (e) => {
  //   console.log('next page', e)
  //   console.log(photoCollection[e + 1] , 'prev photo array')
  // }

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
            src = {`https://image.tmdb.org/t/p/original/${photoID}`}
            alt={`https://image.tmdb.org/t/p/original/${photoID}`}
            className="w-full h-full object-cover"
          />
          <AiOutlineClose
            className=" absolute top-[20px] right-[20px]"
            size={30}
            color="#ffffff"
            onClick={() => setIsPhotosOverlay(false)}
          />

          {/* <AiOutlineArrowRight className="h[400px] w-full absolute left-0 right-0 top-0 bottom-0 bg-slate-500" onClick={() => nextPhoto(index + 2)}/>
              <AiOutlineArrowLeft className="h[400px] w-full absolute left-0 right-0 top-0 bottom-0 bg-slate-500" onClick={() => prevPhoto(index - 2)}/> */}
        </div>
      )}
    </>
  );
};

export default OverlayPhotoOverview;
