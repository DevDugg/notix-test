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
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.centered}>{error}</div>;
  }

  if (results.length === 0 && query) {
    return (
      <div className={`${styles.centered} ${styles.noResults}`}>
        No results found for "{query}"
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list} role="listbox" id="search-results-list">
      {results.map((result, index) => {
        const isActive = index === activeIndex;
        return (
          <li
            key={result.id}
            className={`${styles.listItem} ${isActive ? styles.active : ""}`}
            role="option"
            aria-selected={isActive}
            id={`search-result-${index}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <HighlightedText text={result.name} query={query} />
          </li>
        );
      })}
    </ul>
  );
}
