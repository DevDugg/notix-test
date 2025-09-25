"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useSearch } from "@/hooks/use-search";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useTypeToFocus } from "@/hooks/use-type-to-focus";
import { SearchResult } from "@/components/search-results";

interface SearchContextType {
  inputValue: string;
  handleInputChange: (value: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  activeIndex: number;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  activeDescendant?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  resultsWrapperRef: RefObject<HTMLDivElement | null>;
  showContainer: boolean;
  debouncedQuery: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({
  initialQuery,
  children,
}: {
  initialQuery: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsWrapperRef = useRef<HTMLDivElement>(null);

  const {
    results: searchResults,
    isLoading,
    error,
  } = useSearch(debouncedQuery);
  const [displayedResults, setDisplayedResults] = useState(searchResults);
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    const hasContent = !!(
      searchResults.length ||
      (debouncedQuery && isLoading) ||
      error
    );
    setShowContainer(hasContent);

    const node = resultsWrapperRef.current;
    if (!node) return;

    if (hasContent) {
      setDisplayedResults(searchResults);
    } else {
      const handleTransitionEnd = () => setDisplayedResults([]);
      node.addEventListener("transitionend", handleTransitionEnd, {
        once: true,
      });
      return () =>
        node.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [searchResults, debouncedQuery, isLoading, error]);

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
    itemCount: displayedResults.length,
    onEnter: (index) => console.log("Selected:", displayedResults[index]),
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

  useTypeToFocus(inputRef, handleInputChange);

  useEffect(() => {
    setInputValue(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  const activeDescendant =
    activeIndex !== -1 ? `search-result-${activeIndex}` : undefined;

  const value = {
    inputValue,
    handleInputChange,
    results: displayedResults,
    isLoading: isLoading && !searchResults.length,
    error,
    activeIndex,
    handleKeyDown,
    activeDescendant,
    inputRef,
    resultsWrapperRef,
    showContainer,
    debouncedQuery,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
