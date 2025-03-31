import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import "../styles/ContentList.scss";

const ContentList = ({ categoryId, initialItems, footerText }) => {
  const [items, setItems] = useState(initialItems || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    setItems(initialItems || []);
    setPage(1);
  }, [categoryId, initialItems]);

  const loadMoreItems = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    // 실제 서비스에서는 API 호출로 대체
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => ({
        id: `${categoryId}-${items.length + i + 1}`,
        title: "",
        link: `https://example.com/${categoryId}/${items.length + i + 1}`,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
  }, [categoryId, items.length, loading]);

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  }, [inView, loadMoreItems]);

  return (
    <div className="content-list">
      <h2 className="section-title">콘텐츠 큐레이션 제목</h2>

      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <a href={item.link} className="item-link">
              <div className="item-image"></div>
              {item.title && <div className="item-title">{item.title}</div>}
            </a>
          </li>
        ))}
      </ul>

      <div className="loading-indicator" ref={ref}>{loading && <p>로딩 중...</p>}</div>

      <div
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {footerText || "맨 위로 이동"}
        <span className="arrow-up">↑</span>
      </div>
    </div>
  );
};

export default ContentList;