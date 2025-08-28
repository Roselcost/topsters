import styles from "@/styles/Background.module.css";
export default function Background() {
  return (
    <div className={styles.container}>
      <div className={styles.dark} />
      <div className={styles.light} />
    </div>
  );
}
