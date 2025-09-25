"use client";

import { useEffect } from "react";

export function useTypeToFocus<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onKeyPress: (key: string) => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const key = event.key;

      if (
        key.length === 1 &&
        key.match(/[a-z0-9]/i) &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        target.tagName !== "INPUT" &&
        target.tagName !== "TEXTAREA" &&
        !target.isContentEditable
      ) {
        event.preventDefault();
        ref.current?.focus();
        onKeyPress(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onKeyPress]);
}
