import React from "react";
import styles from "./Pagination.module.css";

function Pagination ({pokemonPerPage, allPokemon , paginado , currentPage}) {
    const pageNumbers = [];

    for (let i=1 ; i <= Math.ceil( allPokemon / pokemonPerPage ); i++) {
        pageNumbers.push(i)
    }


    return (
        <nav>
        <ul className={styles.paginado}>
            { pageNumbers 
                ? pageNumbers.map(number => (
                    <li className={styles.num} key={number}>
                        <button
                            className={number === currentPage ? `${styles.currentPage} ${styles.buttonPage}` : styles.buttonPage}
                            onClick={() => paginado(number)}>
                            {number}
                        </button>
                    </li>
                ))
                : null
            }
        </ul>
    </nav>         
    )
}

export default Pagination;