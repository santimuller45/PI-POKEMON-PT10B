const { Router } = require("express");
const { getTypes } = require("../controllers/controllers");

const typeRouter = Router();

typeRouter.get("/" , async (req,res) => {
    try {
        const typesApi = await getTypes();
        return res.status(200).json(typesApi);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
});

module.exports = typeRouter;