import { useState, useEffect, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import "../styles/ContentList.scss";
import { CATEGORY_TITLES, fetchMoreItems } from "../data/mockData";
import ContentListItem from "./ContentListItem";
import LoadingIndicator from "./common/LoadingIndicator";
import ErrorMessage from "./common/ErrorMessage";

const ContentList = memo(({ categoryId, initialItems, footerText }) => {
  const [items, setItems] = useState(initialItems || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const { ref: observerRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "100px",
  });

  useEffect(() => {
    setItems(initialItems || []);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [categoryId, initialItems]);

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { items: newItems, hasMore: moreAvailable } = await fetchMoreItems(categoryId, page + 1);
      
      setItems(prevItems => [...prevItems, ...newItems]);
      setPage(prevPage => prevPage + 1);
      setHasMore(moreAvailable);
    } catch (err) {
      console.error('Failed to load more items:', err);
      setError('콘텐츠를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [categoryId, loading, hasMore, page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreItems();
    }
  }, [inView, loadMoreItems, hasMore, loading]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    loadMoreItems();
  }, [loadMoreItems]);

  return (
    <div className="content-list">
      <h2 className="section-title">
        {CATEGORY_TITLES[categoryId] || "콘텐츠 큐레이션"}
      </h2>

      {items.length > 0 ? (
        <ul className="list" role="list">
          {items.map((item) => (
            <ContentListItem key={item.id} item={item} />
          ))}
        </ul>
      ) : !loading && !error ? (
        <div className="empty-list">콘텐츠가 없습니다</div>
      ) : null}

      {error ? (
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry} 
        />
      ) : hasMore ? (
        <div className="loading-indicator" ref={observerRef}>
          {loading && <LoadingIndicator text="로딩 중..." />}
        </div>
      ) : items.length > 0 ? (
        <div className="list-end">모든 콘텐츠를 불러왔습니다</div>
      ) : null}

      {items.length > 5 && (
        <button 
          className="scroll-to-top" 
          onClick={handleScrollToTop}
          aria-label="맨 위로 이동"
        >
          {footerText || "맨 위로 이동"}
          <span className="arrow-up" aria-hidden="true">↑</span>
        </button>
      )}
    </div>
  );
});

ContentList.displayName = 'ContentList';

export default ContentList