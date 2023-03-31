import React, { useState } from "react";
import styles from "./Home.module.css"
import CardContainer from "../../components/CardContainer/CardContainer.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../components/redux/actions.js";

function Home () {

    const dispatch = useDispatch();
    const allPokemon = useSelector(state => state.allPokemons)
    
    const [currentPage , setCurrentPage ] = useState(1);
    const pokemonPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = allPokemon.slice( indexOfFirstPokemon, indexOfLastPokemon );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch])

    return(
        <div className={styles.backGround}>
            <CardContainer currentPokemons={currentPokemons}/>
            <Pagination pokemonPerPage={pokemonPerPage} allPokemon={allPokemon.length} paginado={paginado} currentPage={currentPage}/>
        </div>
    )
}

export default Home;