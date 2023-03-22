import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"

function Nav () {

    return(
        <div className={styles.nav}>
            <div>
                <Link to="/home" className={styles.text}>Home</Link>
            </div>
            <div>
                <Link to="/form" className={styles.text}>Crear Pokémon</Link>
            </div>
        </div>
    )
}

export default Nav;