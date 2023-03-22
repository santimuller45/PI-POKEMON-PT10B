import { GET_POKEMONS , GET_TYPES} from "./actions.js";

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
        default: return {...state};
    }
}

export default reducerPokemon;