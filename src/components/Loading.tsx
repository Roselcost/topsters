import React from "react";
import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
}
