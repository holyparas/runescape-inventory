const { Router } = require("express");

const potionRouter = Router();
const potionController = require("../controllers/potionController");

potionRouter.get("/", potionController.potionListGet);

potionRouter.get("/:id", potionController.potionGet);

potionRouter.get("/edit/:id", potionController.potionEditGet);
potionRouter.post("/edit/:id", potionController.potionEditPost);

potionRouter.get("/delete/:id", potionController.potionDelete);

module.exports = potionRouter;
