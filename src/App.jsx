import { useState, useEffect, useCallback, useMemo } from "react";
import './styles/App.scss';
import TabMenu from "./components/TabMenu";
import BannerSlider from "./components/BannerSlider";
import ContentList from "./components/ContentList";
import { useTouchSwipe } from "./hooks/useTouchSwipe";
import { TABS, generateContentItems, BANNERS } from "./data/mockData";

function App() {
  const [activeTab, setActiveTab] = useState("chart");
  const [contentItems, setContentItems] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { containerProps } = useTouchSwipe({
    onSwipeLeft: () => handleSwipeTab(1),
    onSwipeRight: () => handleSwipeTab(-1),
    threshold: 50
  });

  const currentTabIndex = useMemo(() => {
    return TABS.findIndex(tab => tab.id === activeTab);
  }, [activeTab]);

  const handleSwipeTab = useCallback((direction) => {
    const nextIndex = currentTabIndex + direction;
    if (nextIndex >= 0 && nextIndex < TABS.length) {
      handleTabChange(TABS[nextIndex].id);
    }
  }, []);

  const handleTabChange = useCallback((tabId) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setActiveTab(tabId);
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeTab]);

  useEffect(() => {
    setContentItems(generateContentItems(activeTab));
  }, [activeTab]);

  return (
    <div 
      className={`app-container ${isTransitioning ? 'transitioning' : ''}`}
      {...containerProps}
    >
      <TabMenu
        items={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <BannerSlider items={BANNERS} />
      
      <ContentList
        categoryId={activeTab}
        initialItems={contentItems}
        footerText="맨 위로 이동"
      />
    </div>
  );
}

export default App;