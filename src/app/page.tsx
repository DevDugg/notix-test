import styles from "./page.module.css";
import SearchContainer from "@/components/search-container";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams?.q ?? "";

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Search</h1>
        <p className={styles.description}>
          Enter a query to search for results.
        </p>
        <SearchContainer initialQuery={searchQuery as string} />
      </div>
    </main>
  );
}
