import React from "react";
import styles from "./SearchBox.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../redux/actions";

function SearchBox ({ setCurrentPage }) {

    const dispatch = useDispatch();
    const [ pokemon , setPokemon ] = useState("");

    const handleInput = (e) => {
        setPokemon([e.target.value])
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(pokemon));
        setCurrentPage(1);
        setPokemon("");
    }

    return (
        <div className={styles.searchContainer}>
            <input
                placeholder="Search Pokémon..."
                name="name"
                type="text"
                value={pokemon}
                onChange={handleInput}
            />
            <button onClick={handleSearch}>Search</button>
        </div> 
    )
}

export default SearchBox;