import React from "react";
import styles from "./SearchBox.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../redux/actions";

function SearchBox () {

    const dispatch = useDispatch();
    const [ pokemon , setPokemon ] = useState("");

    const handleInput = (e) => {    
        setPokemon([e.target.value])
    }

    const handleSearch = () => {
        dispatch(searchPokemon(pokemon))
        setPokemon("")
    }

    return (
        <>
            <input
                className={styles.container}
                placeholder="Search Pokémon..."
                name="name"
                type="text"
                value={pokemon}
                onChange={handleInput}
            />
            <button className={styles.container} onClick={handleSearch}>Search</button>
        </> 
    )
}

export default SearchBox;