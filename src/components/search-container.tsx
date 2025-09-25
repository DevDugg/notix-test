"use client";

import { SearchProvider, useSearchContext } from "@/contexts/search-context";
import SearchInput from "@/components/search-input";
import SearchResults from "@/components/search-results";
import styles from "./search-container.module.css";

function SearchUI() {
  const {
    inputValue,
    handleInputChange,
    results,
    isLoading,
    error,
    activeIndex,
    handleKeyDown,
    activeDescendant,
    inputRef,
    resultsWrapperRef,
    showContainer,
    debouncedQuery,
  } = useSearchContext();

  return (
    <div onKeyDown={handleKeyDown}>
      <SearchInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        activeDescendant={activeDescendant}
      />
      <div
        ref={resultsWrapperRef}
        className={`${styles.resultsWrapper} ${
          showContainer ? styles.resultsVisible : ""
        }`}
      >
        <div className={styles.resultsContent}>
          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
            activeIndex={activeIndex}
            query={debouncedQuery}
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchContainer({
  initialQuery,
}: {
  initialQuery: string;
}) {
  return (
    <SearchProvider initialQuery={initialQuery}>
      <SearchUI />
    </SearchProvider>
  );
}
