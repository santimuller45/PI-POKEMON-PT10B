const { Router } = require('express');
const pokemonRouter = Router();

const { getPokemons } = require("../controllers/controllers.js")


pokemonRouter.get("/", async (req,res) => {
    try {
        const { pokemonName } = req.query;
        if (!pokemonName) {
            const allPokemons = await getPokemons();
            res.status(200).json(allPokemons);
        } else {
            res.status(200).json(pokemonName);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

pokemonRouter.get("/:idPokemon", (req,res) => {
    try {
        const { idPokemon } = req.params;
        res.send(`${idPokemon} ok`)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

pokemonRouter.post("/", (req,res) => {
    try {
        const { id , name , image , life , attack , defense , speed , hight , weight } = req.body;
        res.status(201).json(newPokemon)
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = pokemonRouter;