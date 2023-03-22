import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducerPokemon from "./reducer";

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducerPokemon,
    composeEnchancer(applyMiddleware(thunkMiddleware))
);