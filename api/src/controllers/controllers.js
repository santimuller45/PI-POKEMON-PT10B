const axios = require("axios");
const { Pokemon , Type} = require("../db.js");
const { Op } = require("sequelize");

const getPokemons = async () => {
    const apiData = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonUrls = apiData.data.results.map(pokemon => pokemon.url);
    const pokemonsDB = await Pokemon.findAll();

    //ejecuto la función getNextPage para obtener 20 pokémons más y los agrego a una nueva var allPokemonsUrls
    const nextPageUrls = await getNextPage(apiData.data.next);
    const allPokemonsUrls = [...pokemonUrls, ...nextPageUrls];

    //Ejecuto cada URL de cada pokémon para obtener su información
    const pokemonsApi = await Promise.all(
        allPokemonsUrls.map(async (url) => {
            const resultApi = await axios.get(url);
            return {
                id: resultApi.data.id,
                name: resultApi.data.name,
                type: (resultApi.data.types.map(data => data.type.name)).join(",")
            };
        })
    )
    return [...pokemonsApi, ...pokemonsDB];
};

const getNextPage = async (nextUrl) => {
    const getNext = await axios.get(nextUrl);
    return getNext.data.results.map(data => data.url);
}

const getQuery = async (name) => {
    if (!name) throw Error("Debe ingresar un nombre de pokémon a buscar");
    const pokemonName = name.toLowerCase();
    const getApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    // if (!getApi.data.name) throw Error(`No existe Pokémon con el nombre: ${name}`);
    const resultsApi = {
        id: getApi.data.id,
        name: getApi.data.name,
        type: (getApi.data.types.map(tipo => tipo.type.name)).join(",")
    }
    return resultsApi;
};

const getIdPokemon = async (id) => {
    const getApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!getApi) throw Error(`No existe Pokémon con el id: ${id}`)
    const resultsApi = {
            id: getApi.data.id,
            name: getApi.data.name,
            image: getApi.data.sprites.front_default,
            life: getApi.data.stats[0].base_stat,
            attack: getApi.data.stats[1].base_stat,
            defense: getApi.data.stats[2].base_stat,
            speed: getApi.data.stats[5].base_stat,
            height: getApi.data.height,
            weight: getApi.data.weight,
            type: (getApi.data.types.map(tipo => tipo.type.name)).join(",")
    };
    return resultsApi;
};

const addPokemon = async (name , image , life , attack , defense , speed , height , weight , type) =>{
    if (!name || !image || !life || !attack || !defense) throw Error("Faltan datos a completar");
    const newPokemon = await Pokemon.create({name, image , life , attack , defense , speed , height , weight});
    const findType = await Type.findAll({
        where:{
            name: {
                [Op.like]:type
            }
        }
    });
    await newPokemon.addType(findType);
    return newPokemon;
};

const getTypes = async () => {
    const types = await axios.get("https://pokeapi.co/api/v2/type");
    const resultsApi = types.data.results.map(data => data.name);
    // await Type.bulkCreate(resultsApi)
    resultsApi.forEach(tipo => Type.findOrCreate({
        where:{
            name: tipo
        }
    }));
    const typeDB = await Type.findAll();
    return typeDB;
}

module.exports = {
    getPokemons,
    getIdPokemon,
    getQuery,
    addPokemon,
    getTypes
}