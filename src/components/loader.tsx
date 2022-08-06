import styles from "../styles/Loader.module.css";

export const Loader = () => {
  return (
    <>
      <div className={styles.LoaderWrapper}>
        <img className={styles.LoaderImage} src="/link.svg" alt="Loading..." />
        <p className={styles.LoaderText}>Loading...</p>
      </div>
    </>
  );
};
