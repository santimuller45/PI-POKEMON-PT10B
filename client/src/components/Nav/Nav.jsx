import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"
import OrderBy from "../OrderBy/OrderBy.jsx";

function Nav () {

    return(
        <div className={styles.nav}>
            <div>
                <Link to="/home" className={styles.text}>Home</Link>
            </div>
            <div>
                <Link to="/form" className={styles.text}>Create Pokémon</Link>
            </div>
            <div>
                <OrderBy/>
            </div>
        </div>
    )
}

export default Nav;