import React from "react";
import styles from "./search-results.module.css";

export interface SearchResult {
  id: string;
  name: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  activeIndex: number;
}

function SearchResults({
  results,
  isLoading,
  error,
  activeIndex,
}: SearchResultsProps) {
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (results.length === 0) {
    return <div className={styles.noResults}>No results found.</div>;
  }

  return (
    <ul className={styles.list} role="listbox">
      {results.map((result, index) => {
        const isActive = index === activeIndex;
        return (
          <li
            key={result.id}
            className={`${styles.listItem} ${isActive ? styles.active : ""}`}
            role="option"
            aria-selected={isActive}
            id={`search-result-${index}`}
          >
            {result.name}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(SearchResults);
