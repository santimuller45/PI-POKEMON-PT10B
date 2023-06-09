const axios = require("axios");
const { Pokemon , Type} = require("../db.js");
const { Op } = require("sequelize");

//función para poner en mayúsculas la primer letra
const mayusFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// función para obtener todos los datos del pokémon en limpio
const infoPokemon = (data) => {
        return {
            id: data.id,
            name: mayusFirstLetter(data.name),
            image: data.sprites.other.dream_world.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map(tipo => mayusFirstLetter(tipo.type.name))
        }
};

/////////////////////////////////////////////////////////////////////////////////////////

const getPokemons = async () => {
    const pokemonsDB = await Pokemon.findAll({ include : { model : Type }});

    // Realizo la primera solicitud a la API para obtener los primeros 20 pokémon
    const apiData = (await axios.get("https://pokeapi.co/api/v2/pokemon/")).data;
    const pokemonUrls = apiData.results.map(pokemon => pokemon.url);

    // Realizo 7 solicitudes más para obtener más pokémon
    let nextPageUrl = apiData.next;
    for (let i = 0; i < 7; i++) {
        const nextPageData = (await axios.get(nextPageUrl)).data;
        const nextPageUrls = nextPageData.results.map(pokemon => pokemon.url);
        pokemonUrls.push(...nextPageUrls);
        nextPageUrl = nextPageData.next;
    }

    //Creo una constante para devolver los 151 pokemons de la primera generacion
    const firstGenPokemon = pokemonUrls.slice(0,151);

    //Ejecuto cada URL de cada pokémon para obtener su información
    const pokemonsApi = await Promise.all(
        firstGenPokemon.map(async (url) => {
            const resultApi = (await axios.get(url)).data;
            return infoPokemon(resultApi)
        })
    )
    return [...pokemonsApi, ...pokemonsDB];
};

const getQuery = async (name) => {
        const pokemonName = name.toLowerCase();

        //BUSCO EN LA DATABASE Y SI LO ENCUENTRA LO RETORNA
        const pokemonDB = await Pokemon.findAll({ where: { name: pokemonName }, include:{ model : Type }});

        if (pokemonDB.length) return pokemonDB;

        //BUSCO EN LA API Y SI LO ENCUENTRA LO RETORNA , SINO ERROR
        const getApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)).data;
        const pokemonApi = infoPokemon(getApi)

        return [pokemonApi];
};

const getIdPokemon = async (id) => {
        if(isNaN(id)) {
            const findPokemonDB = await Pokemon.findByPk(id,{
                include:{
                    model: Type,
                    attributes:["name"],
                }
            });
            return findPokemonDB;
        } else {
            const getApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
            const resultsApi = infoPokemon(getApi);

            return resultsApi;
        }
};

const addPokemon = async ( name , image, hp , attack , defense , speed , height , weight, type ) => {
    if ( !name ||!image ||  !hp || !attack || !defense) throw Error("Faltan datos a completar");
    const newPokemon = await Pokemon.create({ name, image , hp , attack , defense , speed , height , weight});
    const findType = await Type.findAll({ where : { name : type }});
    await newPokemon.addType(findType);
    return newPokemon;
};

const getTypes = async () => {
    const callDB = await Type.findAll()
    if (!callDB.length){
        const apiTypes = (await axios.get("https://pokeapi.co/api/v2/type")).data;
        const resultTypes = apiTypes.results.map(type => ({ name: mayusFirstLetter(type.name) }));
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