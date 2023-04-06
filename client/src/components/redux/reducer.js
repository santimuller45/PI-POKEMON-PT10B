import { GET_POKEMONS , GET_TYPES , ORDER_CARDS , SEARCH , FILTER_BY_SOURCE , FILTER_BY_TYPE, DETAIL_POKEMON } from "./actions.js";

const initialState = {
    allPokemons: [],
    pokemons: [],
    detail: [],
    allTypes: []
}

function reducerPokemon(state = initialState , actions) {
    switch(actions.type) {
        case GET_POKEMONS: {
            return {
                ...state,
                allPokemons: actions.payload,
                pokemons: actions.payload
            }
        }
        case DETAIL_POKEMON: {
            return {
                ...state,
                detail: actions.payload
            }
        }
        case GET_TYPES: {
            return {
                ...state,
                allTypes: actions.payload
            }
        }
        case SEARCH: {
            return {
                ...state,
                pokemons: actions.payload
            }
        }
        case ORDER_CARDS: {
            
            const orderPokemons = actions.payload === "none"
                ? state.pokemons
                : state.pokemons.sort(( elemA , elemB ) => {
                    if (actions.payload === "A-Z") {
                        if ((elemA.name).toUpperCase() < (elemB.name).toUpperCase()) return -1;
                        if ((elemB.name).toUpperCase() < (elemA.name).toUpperCase()) return 1;
                        return 0;
                    } else if (actions.payload === "Z-A") {
                        if ((elemA.name).toUpperCase() < (elemB.name).toUpperCase()) return 1;
                        if ((elemB.name).toUpperCase() < (elemA.name).toUpperCase()) return -1;
                        return 0;
                    } else if (actions.payload === "> Attack") {
                        if (elemA.attack < elemB.attack) return 1;
                        if (elemB.attack < elemA.attack) return -1;
                        return 0;
                    } else {
                        if (elemA.attack < elemB.attack) return -1;
                        if (elemB.attack < elemA.attack) return 1;
                        return 0;
                    }
                });

            return {
                ...state,
                pokemons: [...orderPokemons]
            }
        }
        case FILTER_BY_SOURCE: {

            let filteredSource;
            if (actions.payload === "all") {
                filteredSource = state.allPokemons;
            } else if (actions.payload === "api") {
                filteredSource = state.allPokemons.filter(pokemon => !isNaN(pokemon.id))
            } else {
                filteredSource = state.allPokemons.filter(pokemon => isNaN(pokemon.id))
            }

            return {
                ...state,
                pokemons : filteredSource
            }
        }
        case FILTER_BY_TYPE: {
            let filteredType = actions.payload === "all" 
            ? state.allPokemons
            : state.allPokemons.filter(pokemon => (pokemon.types.map(elem => elem)).includes(actions.payload));

            return {
                ...state,
                pokemons: filteredType
            }
        }

        default: return {...state};
    }
}

export default reducerPokemon;