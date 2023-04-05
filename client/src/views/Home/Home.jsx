import React, { useState } from "react";
import styles from "./Home.module.css"
import CardContainer from "../../components/CardContainer/CardContainer.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { getPokemons, getTypes , orderCards , filterSource , filterType } from "../../components/redux/actions.js";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";

function Home () {

    const dispatch = useDispatch();
    const allPokemon = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.allTypes);
    
    const [currentPage , setCurrentPage ] = useState(1);
    const pokemonPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = allPokemon.slice( indexOfFirstPokemon, indexOfLastPokemon );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOrder = (e) => {
        dispatch(orderCards(e.target.value));
        setCurrentPage(1);
    };

    const handleSource = (e) => {
        dispatch(filterSource(e.target.value));
        setCurrentPage(1);
    };

    const handleType = (e) => {
        dispatch(filterType(e.target.value));
        setCurrentPage(1);
    }

    const reloadPage = () => {
        dispatch(getPokemons());
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch])

    return(
        <div className={styles.backGround}>
            <nav className={styles.box}>
                <button onClick={reloadPage} className={styles.refresh}>Refresh Pokémons</button>
                <div>Order:
                    <select onChange={handleOrder}>
                        <option value="none"> None </option>
                        <option value="A-Z"> A-Z </option>
                        <option value="Z-A"> Z-A </option>
                        <option value="> Attack"> Highest Attack </option>
                        <option value="< Attack"> Lowest Attack </option>
                    </select>
                </div>
                <div>Filter:
                    <select onChange={handleSource}>
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="db">DB</option>
                    </select>
                </div>
                <div>Type:
                    <select onChange={handleType}>
                        <option value="all">All</option>
                        {allTypes.map(elem => (
                            <option value={elem.name} key={elem.id}>{elem.name}</option>
                        ))}
                    </select>
                </div>
                <SearchBox setCurrentPage={setCurrentPage}></SearchBox>
            </nav>
            <CardContainer currentPokemons={currentPokemons}/>
            <Pagination pokemonPerPage={pokemonPerPage} allPokemon={allPokemon.length} paginado={paginado} currentPage={currentPage}/>
        </div>
    )
}

export default Home;