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
  query: string;
}

const HighlightedText = ({ text, query }: { text: string; query: string }) => {
  if (!query) {
    return <>{text}</>;
  }
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className={styles.highlighted}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default function SearchResults({
  results,
  isLoading,
  error,
  activeIndex,
  query,
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
            <HighlightedText text={result.name} query={query} />
          </li>
        );
      })}
    </ul>
  );
}
