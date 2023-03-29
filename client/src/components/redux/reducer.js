import { GET_POKEMONS , GET_TYPES , ORDER_CARDS } from "./actions.js";

const initialState = {
    allPokemons: [],
    allTypes: []
}

function reducerPokemon(state = initialState , actions) {
    switch(actions.type) {
        case GET_POKEMONS: {
            return {
                ...state,
                allPokemons: actions.payload
            }
        }
        case GET_TYPES:{
            return {
                ...state,
                allTypes: actions.payload
            }
        }
        case ORDER_CARDS: {
            
            const orderPokemons = state.allPokemons.sort(( elemA , elemB ) => {
                if (actions.payload === "A-Z") {
                    if ((elemA.name).toUpperCase() < (elemB.name).toUpperCase()) return -1;
                    if ((elemB.name).toUpperCase() < (elemA.name).toUpperCase()) return 1;
                    return 0;
                } else if (actions.payload === "Z-A") {
                    if ((elemA.name).toUpperCase() < (elemB.name).toUpperCase()) return 1;
                    if ((elemB.name).toUpperCase() < (elemA.name).toUpperCase()) return -1;
                    return 0;
                } else {
                    return [...state.allPokemons]
                }
            });

            return {
                ...state,
                allPokemons: [...orderPokemons]
            }
        }

        default: return {...state};
    }
}

export default reducerPokemon;