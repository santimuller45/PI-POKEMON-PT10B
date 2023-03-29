import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const ORDER_CARDS = "ORDER_CARDS";

export const getPokemons = () => {
    return async function(dispatch) {
        const pokemonsData = await axios.get("http://localhost:3001/pokemons");
        const pokemons = pokemonsData.data;
        dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        });
    };
};

export const getTypes = () => {
    return async function(dispatch){
        const typeData = await axios.get("http://localhost:3001/types");
        const types = typeData.data;
        dispatch({
            type: GET_TYPES,
            payload: types
        })
    }
};

export const orderCards = (condition) => {
    return {
        type: ORDER_CARDS,
        payload: condition
    }
}