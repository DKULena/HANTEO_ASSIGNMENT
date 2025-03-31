import { useState, useCallback } from "react";

export const useTouchSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e) => {
    const { clientX, clientY } = e.touches[0];
    setTouchStart({ x: clientX, y: clientY });
    setTouchEnd({ x: clientX, y: clientY });
  }, []);

  const handleTouchMove = useCallback((e) => {
    const { clientX, clientY } = e.touches[0];
    setTouchEnd({ x: clientX, y: clientY });
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeLeft) {
          onSwipeLeft();
        } else if (deltaX < 0 && onSwipeRight) {
          onSwipeRight();
        }
      }
    } else if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && onSwipeUp) {
        onSwipeUp();
      } else if (deltaY < 0 && onSwipeDown) {
        onSwipeDown();
      }
    }
  }, [
    touchStart,
    touchEnd,
    threshold,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);

  return {
    containerProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
