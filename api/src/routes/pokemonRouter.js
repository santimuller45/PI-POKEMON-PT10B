const { Router } = require('express');
const pokemonRouter = Router();

const { getPokemons , getIdPokemon , getQuery, addPokemon} = require("../controllers/controllers.js")


pokemonRouter.get("/", async (req,res) => {
    try {
        const { name } = req.query;
        const resultData = name ? await getQuery(name) : await getPokemons() 
        return res.status(200).json(resultData);
    } catch (error) {
        return res.status(400).send("Pokémon did not found with that name");
    }
});

pokemonRouter.get("/:idPokemon", async (req,res) => {
    try {
        const { idPokemon } = req.params;
        const getPokemon = await getIdPokemon(idPokemon);
        return res.status(200).json(getPokemon);
    } catch (error) {
        return res.status(400).send("Pokémon did not found with given ID");
    }
});

pokemonRouter.post("/", async (req,res) => {
    try {
        const { name , image , hp , attack , defense , speed , height , weight , type } = req.body;
        const newPokemon = await addPokemon( name , image , hp , attack , defense , speed , height , weight , type);
        return res.status(201).send("Pokémon created succesfully!");
    } catch(error) {
        return res.status(400).send("Missing data");
    }
});

module.exports = pokemonRouter;