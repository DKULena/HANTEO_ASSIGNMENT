import { memo, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "../styles/BannerSlider.scss";

const BannerSlider = memo(({ items = [] }) => {
  const swiperRef = useRef(null);

  if (!items.length) {
    return null;
  }

  const handleBannerClick = (item) => {
    console.log("Banner clicked:", item.id);
  };

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
    <section className="banner-slider" aria-label="프로모션 배너">
      <div className="sr-only" aria-live="polite">
        {items.length}개의 배너가 있습니다. 자동으로 슬라이드됩니다.
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
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
        a11y={{
          prevSlideMessage: "이전 배너",
          nextSlideMessage: "다음 배너",
          paginationBulletMessage: "{{index}}번 배너로 이동",
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <a
              href={item.link}
              className="banner-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBannerClick(item)}
              aria-label={`${item.title} - ${item.date}`}
            >
              <div
                className="banner"
                style={{ backgroundColor: item.color || "#6a1b9a" }}
              >
                <div className="banner-content">
                  <div className="label">{item.label || "진행중"}</div>
                  <h3 className="title">{item.title}</h3>
                  <p className="date">{item.date}</p>
                </div>
                <div className="vote-button">투표하기</div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="swiper-pagination"
        role="group"
        aria-label="배너 페이지네이션"
      ></div>
    </section>
  );
});

BannerSlider.displayName = "BannerSlider";

export default BannerSlider;
