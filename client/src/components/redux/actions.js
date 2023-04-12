import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const DETAIL_POKEMON = "DETAIL_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const SEARCH = "SEARCH";
export const ORDER_CARDS = "ORDER_CARDS";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export const getPokemons = () => {
    return async function(dispatch) {
        try {
            const pokemons = (await axios.get("http://localhost:3001/pokemons")).data;
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemons
            });
        } catch (error) {
            console.log(error)
        }
    };
};

export const detailPokemon = (id) => {
    return async function(dispatch) {
        try {
            const detail = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data;
            return dispatch({
                type: DETAIL_POKEMON,
                payload: detail
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const getTypes = () => {
    return async function(dispatch){
        try {
            const types = (await axios.get("http://localhost:3001/types")).data;
            return dispatch({
                type: GET_TYPES,
                payload: types
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const searchPokemon = (pokeName) => {
    return async function(dispatch) {
        try {
            const pokemon = (await axios.get(`http://localhost:3001/pokemons?name=${pokeName}`)).data;
            return dispatch({
                type: SEARCH,
                payload: pokemon
            });
        } catch (error) {
            console.log(error);
        }
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
};