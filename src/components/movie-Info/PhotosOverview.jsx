import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'

const PhotosOverview = ({ photosOverview, toggleBtn2, LazyLoadImage }) => {
  const [photoCollection, setPhotoCollection] = useState([]);
  const { id } = useParams();


  // State for Photos Overlay Condition
  // const [isPhotosOverlay, setIsPhotosOvelay] = useState(false);

  //State for Storing Photos 
    // const [photoID, setPhotoID] = useState('')

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

  const pictureOverlay = (e,f) => {
    console.log(e,f)
  }

  // logic for next picture
  const nextPhoto = (e) => {
    console.log('next page', e)
    // const item = photoCollection.filter((photos) => photos[e] === e);
    console.log(photoCollection[e - 1] , 'next photo array')
  }
  
  //logic for previous picture
  const prevPhoto = (e) => {
    console.log('next page', e)
    // const item = photoCollection.filter((photos) => photos[e] === e);
    console.log(photoCollection[e + 1] , 'prev photo array')
  }


  console.log(photoCollection);



  return (
    <>
      {photosOverview && (
        <div className="mt-20 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap">
          {photoCollection?.map((photo,index) => (
            <div className="w-full h-full relative overflow-hidden bg-cover bg-no-repeat" key={index}>
              <LazyLoadImage
                effect="blur"
                src={`${
                  photo.poster_path === null
                    ? `https://kennyleeholmes.com/wp-content/uploads/2017/09/no-image-available.png`
                    : `https://image.tmdb.org/t/p/original/${photo.file_path}`
                }`}
                alt={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                className="w-full h-full object-cover object-top lg:object-top inline-block !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
                onClick ={() => pictureOverlay(photo.file_path, index + 1)}
              />

              <AiOutlineArrowRight className="h[400px] w-full absolute left-0 right-0 top-0 bottom-0 bg-slate-500" onClick={() => nextPhoto(index + 2)}/>
              <AiOutlineArrowLeft className="h[400px] w-full absolute left-0 right-0 top-0 bottom-0 bg-slate-500" onClick={() => prevPhoto(index - 2)}/>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PhotosOverview;
