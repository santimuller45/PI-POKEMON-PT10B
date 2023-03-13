const { Router } = require("express");

const typeRouter = Router();

typeRouter.get("/" , (req,res) => {
    try {
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = typeRouter;