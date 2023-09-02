import React, { useEffect, useState } from "react";
import OverlayPhotoOverview from "./OverlayPhotoOverview";

const PhotosOverview = ({ photosOverview, toggleBtn2, LazyLoadImage,movieseriesID }) => {
  const [photoCollection, setPhotoCollection] = useState([]);
  // State for Photos Overlay Condition
  const [isPhotosOverlay, setIsPhotosOverlay] = useState(false);

  //State for Storing Photos
  const [photoID, setPhotoID] = useState("");

  // State for Total Photos
  const [photoLength, setPhotoLength] = useState(0);

  //State for Photo Index Position
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchMoviePhotos = async () => {
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
          ? `https://api.themoviedb.org/3/movie/${movieseriesID}/images`
          : `https://api.themoviedb.org/3/tv/${movieseriesID}/images`;

        const response = await fetch(API_URL, options);
        const data = await response.json();
        console.log(data);
        setPhotoCollection(data.backdrops);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchMoviePhotos();
  }, [movieseriesID, toggleBtn2]);

  const pictureOverlay = (imageLink, index) => {
    setIsPhotosOverlay(true);
    setPhotoID(imageLink);
    setPhotoLength(photoCollection.length - 1);
    setPhotoIndex(index);
  };

  return (
    <>
      {photosOverview && (
        <div className="mt-20 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap">
          {photoCollection?.map((photo, index) => (
            <div
              className="w-full h-full relative overflow-hidden bg-cover bg-no-repeat"
              key={index}
            >
              <LazyLoadImage
                effect="blur"
                src={`${
                  photo.poster_path === null
                    ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                    : `https://image.tmdb.org/t/p/original/${photo.file_path}`
                }`}
                alt={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                className="w-full h-full object-cover object-top lg:object-top inline-block !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
                onClick={() => pictureOverlay(photo.file_path, index)}
              />
            </div>
          ))}
        </div>
      )}

      <OverlayPhotoOverview
        isPhotosOverlay={isPhotosOverlay}
        setIsPhotosOverlay={setIsPhotosOverlay}
        photoID={photoID}
        setPhotoID={setPhotoID}
        LazyLoadImage={LazyLoadImage}
        photoLength={photoLength}
        photoIndex={photoIndex}
        photoCollection={photoCollection}
        setPhotoCollection={setPhotoCollection}
        setPhotoIndex={setPhotoIndex}
      />
    </>
  );
};

export default PhotosOverview;
