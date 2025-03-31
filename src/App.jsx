import './styles/App.scss';
import TabMenu from "./components/TabMenu";
import BannerSlider from "./components/BannerSlider";
import ContentList from "./components/ContentList";
import { useState, useEffect } from "react";

function App() {
  const tabMenuItems = [
    { id: "chart", name: "차트" },
    { id: "whook", name: "Whook" },
    { id: "event", name: "이벤트" },
    { id: "news", name: "뉴스" },
    { id: "store", name: "스토어" },
    { id: "gift", name: "충전소" },
  ];

  // 배너 아이템 - 실제 이미지 대신 색상 배경 사용
  const bannerItems = [
    {
      id: 1,
      title: "[M COUNTDOWN] 10월 2주차 예고 사전 투표",
      date: "2020.02.08 10:00 ~ 2020.04.08 17:00 (KST)",
      image: "https://images.unsplash.com/photo-1640402882370-eb3d172f026e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://example.com/vote1",
    },
    {
      id: 2,
      title: "새로운 K-POP 스타 투표",
      date: "2020.03.10 10:00 ~ 2020.04.10 17:00 (KST)",
      image: "https://images.unsplash.com/photo-1640402882370-eb3d172f026e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://example.com/vote2",
    },
    {
      id: 3,
      title: "이달의 아티스트 선정",
      date: "2020.04.01 10:00 ~ 2020.04.15 17:00 (KST)",
      image: "https://images.unsplash.com/photo-1640402882370-eb3d172f026e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://example.com/artist",
    },
  ];

  const generateContentItems = (categoryId, count = 8) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${categoryId}-${i + 1}`,
      title: i === 1 ? "" : "",
      link: `https://example.com/${categoryId}/${i + 1}`,
    }));
  };

  const [activeTab, setActiveTab] = useState("whook");
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    setContentItems(generateContentItems(activeTab));
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="app-container">
      <TabMenu
        items={tabMenuItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <BannerSlider items={bannerItems} />
      
      <ContentList
        categoryId={activeTab}
        initialItems={contentItems}
        footerText="최하단 푸터 영역"
      />
    </div>
  );
}

export default App;