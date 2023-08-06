import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PhotosOverview = ({ photosOverview, toggleBtn2, LazyLoadImage }) => {
  const [photoCollection, setPhotoCollection] = useState([]);
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
          ? `https://api.themoviedb.org/3/movie/${id}/images`
          : `https://api.themoviedb.org/3/tv/${id}/images`;

        const response = await fetch(API_URL, options);
        const data = await response.json();
        console.log(data);
        setPhotoCollection(data.backdrops);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchMovieVideos();
  }, [id, toggleBtn2]);

  console.log(toggleBtn2);

  return (
    <>
      {photosOverview && (
        <div className="mt-20 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap">
          {photoCollection?.map((photo) => (
            <div className="w-full h-full relative overflow-hidden bg-cover bg-no-repea">
              <LazyLoadImage
                effect="blur"
                src={`${
                  photo.poster_path === null
                    ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                    : `https://image.tmdb.org/t/p/original/${photo.file_path}`
                }`}
                alt={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                className="w-full h-full object-cover object-top lg:object-top inline-block !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PhotosOverview;
