const { Router } = require('express');
const pokemonRouter = Router();

const { getPokemons , getIdPokemon , getQuery, addPokemon} = require("../controllers/controllers.js")


pokemonRouter.get("/", async (req,res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const allPokemons = await getPokemons();
            return res.status(200).json(allPokemons);
        } else {
            const resultQuery = await getQuery(name);
            return res.status(200).json(resultQuery);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

pokemonRouter.get("/:idPokemon", async (req,res) => {
    try {
        const { idPokemon } = req.params;
        const getPokemon = await getIdPokemon(idPokemon);
        res.status(200).json(getPokemon);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

pokemonRouter.post("/", async (req,res) => {
    try {
        const { name , image , hp , attack , defense , speed , height , weight , type } = req.body;
        const newPokemon = await addPokemon( name, image , hp , attack , defense , speed , height , weight , type);
        res.status(200).json(newPokemon);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = pokemonRouter;