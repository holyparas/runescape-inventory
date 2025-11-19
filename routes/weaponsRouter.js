const { Router } = require("express");

const weaponsRouter = Router();
const weaponsController = require("../controllers/weaponsController");

weaponsRouter.get("/", weaponsController.weaponsListGet);

weaponsRouter.get("/:id", weaponsController.weaponGet);

weaponsRouter.get("/edit/:id", weaponsController.weaponEditGet);
weaponsRouter.post("/edit/:id", weaponsController.weaponEditPost);

weaponsRouter.get("/delete/:id", weaponsController.weaponDelete);

module.exports = weaponsRouter;
