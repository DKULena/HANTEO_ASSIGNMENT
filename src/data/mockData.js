export const TABS = [
  { id: "chart", name: "차트" },
  { id: "whook", name: "Whook" },
  { id: "event", name: "이벤트" },
  { id: "news", name: "뉴스" },
  { id: "store", name: "스토어" },
  { id: "gift", name: "충전소" },
];

export const BANNERS = [
  {
    id: 1,
    title: "[M COUNTDOWN] 10월 2주차 예고 사전 투표",
    date: "2020.02.08 10:00 ~ 2020.04.08 17:00 (KST)",
    link: "https://example.com/vote1",
    color: "#8e24aa",
    label: "진행중",
  },
  {
    id: 2,
    title: "새로운 K-POP 스타 투표",
    date: "2020.03.10 10:00 ~ 2020.04.10 17:00 (KST)",
    link: "https://example.com/vote2",
    color: "#5e35b1",
    label: "신규",
  },
  {
    id: 3,
    title: "이달의 아티스트 선정",
    date: "2020.04.01 10:00 ~ 2020.04.15 17:00 (KST)",
    link: "https://example.com/artist",
    color: "#3949ab",
    label: "인기",
  },
];

export const CATEGORY_TITLES = {
  chart: "인기 차트",
  whook: "Whook 추천 콘텐츠",
  event: "진행중인 이벤트",
  news: "최신 K-POP 뉴스",
  store: "스토어 인기 상품",
  gift: "충전소 혜택",
};

export const CONTENT_TITLES_BY_CATEGORY = {
  chart: [
    "2024 상반기 K-POP 앨범 차트",
    "이번 주 인기 음원 TOP 10",
    "글로벌 K-POP 인기 순위",
    "신인 그룹 차트 급상승",
    "팬 투표 인기 아티스트",
    "주간 음악방송 1위 모음",
  ],
  whook: [
    "Whook 추천 - 신곡 플레이리스트",
    "이 주의 Whook 스페셜 앨범",
    "인기 아이돌 최신 활동",
    "Whook 독점 콘텐츠 모음",
    "팬이 선택한 인기 영상",
    "추천 플레이리스트 - 여름 특집",
  ],
  event: [
    "팬미팅 티켓 오픈 안내",
    "신곡 발매 기념 이벤트",
    "콘서트 사전 예약 오픈",
    "팬클럽 모집 안내",
    "서울 콘서트 티켓 이벤트",
    "신규 앨범 발매 기념 사인회",
  ],
  news: [
    "인기 그룹 컴백 소식",
    "글로벌 투어 일정 발표",
    "신인 그룹 데뷔 소식",
    "신곡 뮤직비디오 공개",
    "해외 차트 진입 소식",
    "아티스트 신보 발매 소식",
  ],
  store: [
    "한정판 앨범 패키지",
    "월드투어 공식 굿즈",
    "신규 포토카드 세트",
    "아티스트 공식 응원봉",
    "계절 한정 팬클럽 굿즈",
    "멤버 생일 기념 상품",
  ],
  gift: [
    "신규 회원 포인트 지급",
    "출석체크 이벤트",
    "투표 참여 보상",
    "팬클럽 가입 혜택",
    "앱 다운로드 포인트",
    "이벤트 참여 충전소",
  ],
};

export function generateContentItems(categoryId, count = 8) {
  const titles = CONTENT_TITLES_BY_CATEGORY[categoryId] || [];

  return Array.from({ length: count }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    title: titles[i % titles.length] || `${categoryId} 콘텐츠 ${i + 1}`,
    link: `https://example.com/${categoryId}/${i + 1}`,
    imageUrl: null,
  }));
}

export function fetchMoreItems(categoryId, page, itemsPerPage = 5) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page > 3) {
        resolve({ items: [], hasMore: false });
        return;
      }

      const startIndex = (page - 1) * itemsPerPage;
      const titles = CONTENT_TITLES_BY_CATEGORY[categoryId] || [];

      const items = Array.from({ length: itemsPerPage }, (_, i) => {
        const index = startIndex + i;
        return {
          id: `${categoryId}-${index + 1}`,
          title:
            titles[index % titles.length] ||
            `${categoryId} 콘텐츠 ${index + 1}`,
          link: `https://example.com/${categoryId}/${index + 1}`,
          imageUrl: null,
        };
      });

      resolve({
        items,
        hasMore: page < 3,
      });
    }, 800);
  });
}
