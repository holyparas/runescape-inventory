const { Router } = require("express");

const armourRouter = Router();
const armourController = require("../controllers/armourController");

armourRouter.get("/", armourController.armourListGet);

armourRouter.get("/:id", armourController.armourGet);

armourRouter.get("/edit/:id", armourController.armourEditGet);
armourRouter.post("/edit/:id", armourController.armourEditPost);

armourRouter.get("/delete/:id", armourController.armourDelete);

module.exports = armourRouter;
