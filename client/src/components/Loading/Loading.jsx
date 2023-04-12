import React from 'react';
import styles from "./Loading.module.css"

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingAnimation}></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;