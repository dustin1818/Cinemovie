import React from "react";
import { useNavigate } from "react-router-dom";

const ShowingMovies = ({
  showingMovies,
  setMovieSeriesID,
  LazyLoadImage,
  Swiper,
  SwiperSlide,
  Scrollbar,
}) => {
  const navigate = useNavigate();
  const goToDetailsPage = (id) => {
    console.log("movie id:", id);
    setMovieSeriesID(id);
    navigate(`/info/${id}`);
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={35}
        breakpoints={{
          320: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {showingMovies.results?.map((movies) => (
          <SwiperSlide key={movies.id}>
            <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-t">
              <LazyLoadImage
                effect="blur"
                className=" h-auto !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
                src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                alt={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                onClick={() => goToDetailsPage(movies.id)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ShowingMovies;
