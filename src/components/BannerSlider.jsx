import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../styles/BannerSlider.scss";

const BannerSlider = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="banner-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        className="swiper-container"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="banner">
                <div className="banner-content">
                  <div className="label">진행중</div>
                  <h3 className="title">{item.title}</h3>
                  <p className="date">{item.date}</p>
                </div>
                <div className="vote-button">투표하기</div>
              </div>
            </a>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default BannerSlider;