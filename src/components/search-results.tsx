import styles from "./search-results.module.css";

export interface SearchResult {
  id: string;
  name: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

export default function SearchResults({
  results,
  isLoading,
  error,
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
    <ul className={styles.list}>
      {results.map((result) => (
        <li key={result.id} className={styles.listItem}>
          <span>{result.name}</span>
        </li>
      ))}
    </ul>
  );
}
