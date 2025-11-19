const { Router } = require("express");

const foodRouter = Router();
const foodController = require("../controllers/foodController");

foodRouter.get("/", foodController.foodListGet);

foodRouter.get("/:id", foodController.foodGet);

foodRouter.get("/edit/:id", foodController.foodEditGet);
foodRouter.post("/edit/:id", foodController.foodEditPost);

foodRouter.get("/delete/:id", foodController.foodDelete);

module.exports = foodRouter;
