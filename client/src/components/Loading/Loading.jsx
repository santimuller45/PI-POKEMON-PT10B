import React from 'react';
import styles from "./Loading.module.css"
import pokeballImg from "../../source/pokeball-1280.png"

function Loading() {
  return (
    <div className={styles.loading}>
      <img
        className={styles.loadingAnimation}
        src={pokeballImg}
        alt="Pokeball"
      />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;