import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"
import OrderBy from "../OrderBy/OrderBy.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

function Nav () {

    return(
        <div className={styles.nav}>
            <div>
                <OrderBy/>
            </div>
            <div>
                <SearchBox/>
            </div>
            <div>
                <Link to="/home" className={styles.text}>Home</Link>
            </div>
            <div>
                <Link to="/form" className={styles.text}>New Pokémon</Link>
            </div>
        </div>
    )
}

export default Nav;