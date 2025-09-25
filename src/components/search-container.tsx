"use client";

import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useSearch } from "@/hooks/use-search";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useTypeToFocus } from "@/hooks/use-type-to-focus";
import SearchInput from "@/components/search-input";
import SearchResults from "@/components/search-results";

export default function SearchContainer({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, isLoading, error } = useSearch(debouncedQuery);

  const updateUrlAndQuery = useDebouncedCallback((query: string) => {
    setDebouncedQuery(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleEscape = useCallback(() => {
    setInputValue("");
    updateUrlAndQuery("");
  }, [updateUrlAndQuery]);

  const { activeIndex, setActiveIndex, handleKeyDown } = useKeyboardNavigation({
    itemCount: results.length,
    onEnter: (index) => {
      console.log("Selected:", results[index]);
    },
    onEscape: handleEscape,
  });

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      updateUrlAndQuery(value);
      setActiveIndex(-1);
    },
    [updateUrlAndQuery, setActiveIndex]
  );

  useTypeToFocus(inputRef as RefObject<HTMLElement>, handleInputChange);

  useEffect(() => {
    setInputValue(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  const activeDescendant =
    activeIndex !== -1 ? `search-result-${activeIndex}` : undefined;

  return (
    <div onKeyDown={handleKeyDown}>
      <SearchInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        activeDescendant={activeDescendant}
      />
      <SearchResults
        results={results}
        isLoading={isLoading}
        error={error}
        activeIndex={activeIndex}
      />
    </div>
  );
}
