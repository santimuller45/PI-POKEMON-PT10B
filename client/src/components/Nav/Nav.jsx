import React from "react";
import styles from "./Nav.module.css"
import { useNavigate } from "react-router-dom";

function Nav () {

    const navigate = useNavigate();

    return(
        <nav className={styles.nav}>
            <button className={styles.buttonNew} onClick={() => navigate("/form")}>New Pokémon</button>
        </nav>
    )
}

export default Nav;