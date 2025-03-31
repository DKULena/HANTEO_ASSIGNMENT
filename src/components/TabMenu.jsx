import { useEffect, useRef, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/TabMenu.scss";
const TabMenu = memo(({ items, activeTab, onTabChange }) => {
  
  const swiperRef = useRef(null);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      const activeIndex = items.findIndex((item) => item.id === activeTab);
      if (activeIndex !== -1) {
        swiperRef.current.swiper.slideTo(activeIndex, 300);
      }
    }
  }, [activeTab, items]);

  const handleSwiper = useCallback((swiper) => {
    swiperRef.current = { swiper };
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    const newTabId = items[swiper.activeIndex]?.id;
    if (newTabId && newTabId !== activeTabRef.current) {
      onTabChange(newTabId);
    }
  }, [items, onTabChange]);

  const handleTabClick = useCallback((tabId) => {
    if (tabId !== activeTabRef.current) {
      onTabChange(tabId);
    }
  }, [onTabChange]);

  const handleKeyDown = useCallback((event, tabId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId);
    }
  }, [handleTabClick]);

  return (
    <nav className="tab-menu" role="navigation" aria-label="카테고리 탭 메뉴">
      <Swiper
        onSwiper={handleSwiper}
        slidesPerView="auto"
        spaceBetween={0}
        centeredSlides={false}
        onSlideChange={handleSlideChange}
        touchRatio={1.5}
        touchAngle={45}
        grabCursor={true}
        className="swiper-container"
        a11y={{
          enabled: true,
          prevSlideMessage: '이전 탭 메뉴',
          nextSlideMessage: '다음 탭 메뉴',
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <button
              className={`tab-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => handleTabClick(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-selected={activeTab === item.id}
              role="tab"
              tabIndex={activeTab === item.id ? 0 : -1}
              aria-controls={`${item.id}-panel`}
              id={`${item.id}-tab`}
            >
              {item.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  );
});

TabMenu.displayName = 'TabMenu';

export default TabMenu;