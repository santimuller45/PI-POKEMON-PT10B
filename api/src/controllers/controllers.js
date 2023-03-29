const axios = require("axios");
const { Pokemon , Type} = require("../db.js");
const { Op } = require("sequelize");


// función para obtener todos los datos del pokémon en limpio

const infoPokemon = (data) => {
        return {
            id: data.id,
            name: (data.name).charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other.dream_world.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map(tipo => (tipo.type.name).charAt(0).toUpperCase() + tipo.type.name.slice(1))
        }
};

const getPokemons = async () => {
    const pokemonsDB = await Pokemon.findAll({include:{model:Type}});
    const apiData = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
    const pokemonUrls = apiData.results.map(pokemon => pokemon.url);

    //ejecuto la función getNextPage para obtener 20 pokémons más y los agrego a una nueva var allPokemonsUrls
    const nextPageUrls = await getNextPage(apiData.next);
    const allPokemonsUrls = [...pokemonUrls, ...nextPageUrls];

    //Ejecuto cada URL de cada pokémon para obtener su información
    const pokemonsApi = await Promise.all(
        allPokemonsUrls.map(async (url) => {
            const resultApi = (await axios.get(url)).data;
            return infoPokemon(resultApi)
        })
    )
    return [...pokemonsApi, ...pokemonsDB];
};

const getNextPage = async (nextUrl) => {
    const getNext = (await axios.get(nextUrl)).data;
    return getNext.results.map(data => data.url);
}

const getQuery = async (name) => {
    try {
        const pokemonName = name.toLowerCase();

        //BUSCO EN LA DATABASE Y SI LO ENCUENTRA LO RETORNA
        const pokemonDB = await Pokemon.findAll({ where: { name: pokemonName },include:{model:Type}})
        if (pokemonDB.length) return pokemonDB;

        //BUSCO EN LA API Y SI LO ENCUENTRA LO RETORNA , SINO ERROR
        const getApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)).data;
        const pokemonApi = infoPokemon(getApi)

        return pokemonApi;

    } catch (error) {
        throw Error(`No se encontro Pokémon con el nombre: ${name}`)
    } 
};

const getIdPokemon = async (id) => {
    try{
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
    } catch (error) {
        throw Error(`No se encontro pokémon con el id: ${id}`)
    }  
};

const addPokemon = async ( name , image, hp , attack , defense , speed , height , weight , type ) =>{
    if ( !name ||!image ||  !hp || !attack || !defense) throw Error("Faltan datos a completar");
    const newPokemon = await Pokemon.create({name, image , hp , attack , defense , speed , height , weight});
    const findType = await Type.findAll({ where : { name : type }});
    await newPokemon.addType(findType);
    return newPokemon;
};

const getTypes = async () => {
    const callDB = await Type.findAll()
    if (!callDB.length){
        const apiTypes = (await axios.get("https://pokeapi.co/api/v2/type")).data;
        const resultTypes = apiTypes.results.map(type => ({ name: type.name }));
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