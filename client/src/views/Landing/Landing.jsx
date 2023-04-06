import React from "react";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

function Landing () {

    const navigate = useNavigate();

    return(
        <div className={styles.backGround}>
            <h1 className={styles.title}>Bienvenidos al PI Pokémon</h1>
            <button className={styles.buttonHome} onClick={() => navigate("/home")}>Ingresar al PI</button>
        </div>
    )
}

// //.backGround{
//     background-image: url("../../source/background.jpg");
//     background-size: cover;
//     background-position: center;
//     background-repeat:no-repeat;
//     height: 100vh;
//     width: 100vw;
// }

export default Landing;