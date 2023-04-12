import React from "react";
import styles from "./Pagination.module.css";

function Pagination ({pokemonPerPage, allPokemon , paginado , currentPage}) {
    
    const pageNumbers = [];

    for (let i=1 ; i <= Math.ceil( allPokemon / pokemonPerPage ); i++) {
        pageNumbers.push(i)
    }

    const nextPageHandler = () => {
        const findCurrent = pageNumbers.find(num => num === currentPage)
        if (findCurrent === pageNumbers.length ) return;
        paginado(findCurrent + 1)
    }
    const prevPageHandler = () => {
        const findCurrent = pageNumbers.find(num => num === currentPage)
        if (findCurrent === 1 ) return;
        paginado(findCurrent - 1)
    }

    return (
        <ul className={styles.paginado}>
            {pageNumbers.length > 0 
                ?   <>
                        <button className={styles.buttonPrevNext} onClick={prevPageHandler}>Prev</button>
                        {pageNumbers.map(number => (
                            <li className={styles.num} key={number}>
                                <button
                                    className={number === currentPage ? `${styles.currentPage} ${styles.buttonPage}` : styles.buttonPage}
                                    onClick={() => paginado(number)}>
                                    {number}
                                </button>
                            </li>
                        ))}
                        <button className={styles.buttonPrevNext} onClick={nextPageHandler}>Next</button>
                    </>
                : null
            }      
        </ul>        
    )
}

export default Pagination;