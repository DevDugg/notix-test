import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Search</h1>
        <p className={styles.description}>
          Enter a query to search for results.
        </p>
      </div>
    </main>
  );
}
