import React from "react";

const CastSlider = ({
  movieCast,
  LazyLoadImage,
  Swiper,
  SwiperSlide,
  Scrollbar,
  useNavigate,
}) => {
  const navigate = useNavigate();
  const goToActorPage = (id) => {
    console.log("cast id:", id);
    navigate(`/person/${id}`);
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
      {movieCast.cast?.map((cast) => (
        <SwiperSlide
          key={cast.id}
          className={cast.profile_path === null ? "!hidden" : "flex"}
        >
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <LazyLoadImage
              effect="blur"
              className="!h-[130px] md:!h-[200px] lg:!h-[242px] md:!w-[182px] !transition !duration-300 !ease-in-out hover:!scale-[1.05]"
              src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
              alt={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
              onClick={() => goToActorPage(cast.id)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CastSlider;
