import React, { useState } from "react";

const RecommendationSlider = ({
  recommendations,
  LazyLoadImage,
  Swiper,
  SwiperSlide,
  Scrollbar,
  setMovieSeriesID,
  topElement,
}) => {
  const goToDetailsPage = (id) => {
    setMovieSeriesID(id);
    console.log(topElement);
    topElement.current.scrollIntoView({ behaviour: "smooth" });
  };
  return (
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
      {recommendations.results?.map((recommendation) => (
        <SwiperSlide
          key={recommendation.id}
          className={recommendation.poster_path === null ? "!hidden" : "flex"}
        >
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <LazyLoadImage
              effect="blur"
              className="!h-[130px] md:!h-[200px] lg:!h-[242px] md:!w-[182px] !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
              src={`https://image.tmdb.org/t/p/original/${recommendation.poster_path}`}
              alt={`https://image.tmdb.org/t/p/original/${recommendation.poster_path}`}
              onClick={() => goToDetailsPage(recommendation.id)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendationSlider;
