"use client";

import { useState, useCallback } from "react";

interface UseKeyboardNavigationProps {
  itemCount: number;
  onEnter: (index: number) => void;
  onEscape?: () => void;
}

export function useKeyboardNavigation({
  itemCount,
  onEnter,
  onEscape,
}: UseKeyboardNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex < itemCount - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      } else if (event.key === "Enter" && activeIndex !== -1) {
        event.preventDefault();
        onEnter(activeIndex);
      } else if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(-1);
        onEscape?.();
      }
    },
    [itemCount, activeIndex, onEnter, onEscape]
  );

  return { activeIndex, setActiveIndex, handleKeyDown };
}
