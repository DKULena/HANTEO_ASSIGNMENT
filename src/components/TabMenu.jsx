import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/TabMenu.scss";
import { useEffect, useRef } from "react";

const TabMenu = ({ items, activeTab, onTabChange }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const activeIndex = items.findIndex((item) => item.id === activeTab);
      if (activeIndex !== -1) {
        swiperRef.current.swiper.slideTo(activeIndex);
      }
    }
  }, [activeTab, items]);

  const handleSlideChange = (swiper) => {
    const newTabId = items[swiper.activeIndex].id;
    if (newTabId !== activeTab) {
      onTabChange(newTabId);
    }
  };

  return (
    <div className="tab-menu">
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        spaceBetween={0}
        centeredSlides={false}
        onSlideChange={handleSlideChange}
        className="swiper-container"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <button
              className={`tab-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => onTabChange(item.id)}
            >
              {item.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TabMenu;