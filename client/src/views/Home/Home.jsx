import React, { useState } from "react";
import styles from "./Home.module.css"
import { useSelector , useDispatch } from "react-redux";
import { getPokemons, orderCards , filterSource , filterType } from "../../components/redux/actions.js";
import { Pagination , CardContainer , SearchBox , Nav , Loading } from "../../components/index.js";

function Home () {

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.allTypes);

    const [loading , setLoading] = useState(false);
    const [currentPage , setCurrentPage ] = useState(1);
    const pokemonPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = allPokemons.slice( indexOfFirstPokemon, indexOfLastPokemon );

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
        setLoading(true);
        dispatch(getPokemons());
        setCurrentPage(1);
        setTimeout(() => {
            setLoading(false)
        }, 5500);
    }

    return(
        <div>
            <Nav/>
            <nav className={styles.displayBar}>
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
            {!currentPokemons.length || loading === true
                ? <Loading/>
                :   <>  
                        <CardContainer currentPokemons={currentPokemons}/>
                        <Pagination pokemonPerPage={pokemonPerPage} allPokemon={allPokemons.length} paginado={paginado} currentPage={currentPage}/>
                    </>
            }
        </div>
    )
}

export default Home;