import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"
import OrderBy from "../OrderBy/OrderBy.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

function Nav () {

    return(
        <nav className={styles.nav}>
            <OrderBy/>
            <SearchBox/>
            <Link to="/home" className={styles.text}>Home</Link>
            <Link to="/form" className={styles.text}>New Pokémon</Link>
        </nav>
    )
}

export default Nav;