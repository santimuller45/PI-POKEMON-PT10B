const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemons = async () => {
    const getApi = await axios.get(URL);
    const resultsApi = getApi.data.results.map(pokemon => {
        return {
            name: pokemon.name,
            url: pokemon.url
        }
    });
    return resultsApi;
}

module.exports = {
    getPokemons
}