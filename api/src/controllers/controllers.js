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
                image: resultApi.data.sprites.other.dream_world.front_default,
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
    try {
        const getDB = await Pokemon.findAll();
        const findPokemon = getDB.find(pokemon => (pokemon.name).toLowerCase() == name.toLowerCase());
        if (findPokemon) return findPokemon;

        const pokemonName = name.toLowerCase();
        const getApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const resultsApi = {
            id: getApi.data.id,
            image: getApi.data.sprites.other.dream_world.front_default,
            name: getApi.data.name,
            type: (getApi.data.types.map(tipo => tipo.type.name)).join(",")
        }

        return resultsApi;

    } catch (error) {
        throw Error(`No se encontro Pokémon con el nombre: ${name}`)
    } 
};

const getIdPokemon = async (id) => {
    try{
        const getDB = await Pokemon.findAll();
        const findPokemon = getDB.find(pokemon => pokemon.id == id);
        if (findPokemon) return findPokemon;

        const getApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const resultsApi = {
            id: getApi.data.id,
            name: getApi.data.name,
            image: getApi.data.sprites.other.dream_world.front_default,
            hp: getApi.data.stats[0].base_stat,
            attack: getApi.data.stats[1].base_stat,
            defense: getApi.data.stats[2].base_stat,
            speed: getApi.data.stats[5].base_stat,
            height: getApi.data.height,
            weight: getApi.data.weight,
            type: (getApi.data.types.map(tipo => tipo.type.name)).join(",")
        };

        return resultsApi;

    } catch (error) {
        throw Error(`No se encontro pokémon con el id: ${id}`)
    }  
};

const addPokemon = async (name , image , hp , attack , defense , speed , height , weight , type) =>{
    if (!name || !image || !life || !attack || !defense) throw Error("Faltan datos a completar");
    const newPokemon = await Pokemon.create({name, image , hp , attack , defense , speed , height , weight});
    const findType = await Type.findOne({where:{name:type}});
    await newPokemon.addType(findType);
    return newPokemon;
};

const getTypes = async () => {
    const callDB = await Type.findAll()
    if (!callDB.length){
        const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
        const resultTypes = apiTypes.data.results.map(type => ({ name: type.name }));
        await Type.bulkCreate(resultTypes);
        const typesDB = await Type.findAll();
        return typesDB;
    } else {
        return callDB;
    }
}

module.exports = {
    getPokemons,
    getIdPokemon,
    getQuery,
    addPokemon,
    getTypes
}