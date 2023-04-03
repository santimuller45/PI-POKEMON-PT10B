import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const SEARCH = "SEARCH";
export const ORDER_CARDS = "ORDER_CARDS";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export const getPokemons = () => {
    return async function(dispatch) {
        const pokemons = (await axios.get("http://localhost:3001/pokemons")).data;
        dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        });
    };
};

export const getTypes = () => {
    return async function(dispatch){
        const types = (await axios.get("http://localhost:3001/types")).data;
        dispatch({
            type: GET_TYPES,
            payload: types
        })
    }
};

export const searchPokemon = (pokeName) => {
    return async function(dispatch) {
        const pokemon = (await axios.get(`http://localhost:3001/pokemons?name=${pokeName}`)).data;
        dispatch({
            type: SEARCH,
            payload: pokemon
        })
    }
};

export const orderCards = (condition) => {
    return {
        type: ORDER_CARDS,
        payload: condition
    }
};

export const filterSource = (condition) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: condition
    }
};

export const filterType = (condition) => {
    return {
        type: FILTER_BY_TYPE,
        payload: condition
    }
}