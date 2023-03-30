const { Router } = require('express');
const pokemonRouter = Router();

const { getPokemons , getIdPokemon , getQuery, addPokemon} = require("../controllers/controllers.js")


pokemonRouter.get("/", async (req,res) => {
    try {
        const { name } = req.query;
        const resultData = name ? await getQuery(name) : await getPokemons() 
        return res.status(200).json(resultData);
    } catch (error) {
        res.status(400).json({error:"No se encontro un Pokémon con ese nombre"});
    }
});

pokemonRouter.get("/:idPokemon", async (req,res) => {
    try {
        const { idPokemon } = req.params;
        const getPokemon = await getIdPokemon(idPokemon);
        res.status(200).json(getPokemon);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
});

pokemonRouter.post("/", async (req,res) => {
    try {
        const { name , image , hp , attack , defense , speed , height , weight , type } = req.body;
        const newPokemon = await addPokemon( name , image , hp , attack , defense , speed , height , weight , type);
        res.status(201).json(newPokemon);
    } catch(error) {
        res.status(400).json({error:error.message});
    }
});

module.exports = pokemonRouter;