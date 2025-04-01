import { memo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/BannerSlider.scss";

const BannerSlider = memo(({ items = [] }) => {
  const swiperRef = useRef(null);

  if (!items.length) {
    return null;
  }

  const handlePause = () => {
    if (swiperRef.current?.swiper?.autoplay) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleResume = () => {
    if (swiperRef.current?.swiper?.autoplay) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section className="banner-section">
      <div className="banner-slider" aria-label="프로모션 배너">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          slidesPerView="auto"
          centeredSlides={false}
          loop={true}
          spaceBetween={10}
          speed={500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
          className="swiper-container"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="banner-card">
                <div 
                  className="banner"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="status-tag">{item.label || "진행중"}</div>
                  <div className="banner-content">
                    <h3 className="title">{item.title}</h3>
                    <p className="date">{item.date}</p>
                  </div>
                  <a
                    href={item.link}
                    className="vote-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    투표하기
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="swiper-pagination"
          role="group"
          aria-label="배너 페이지네이션"
        ></div>
      </div>
    </section>
  );
});

BannerSlider.displayName = "BannerSlider";

export default BannerSlider;