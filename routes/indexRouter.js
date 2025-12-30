const { Router } = require("express");
const foodDB = require("../db/foodQueries");
const weaponsDB = require("../db/queries");
const armourDB = require("../db/armourQueries");
const potionDB = require("../db/potionQueries");

const multer = require("multer");
const path = require("path");

const supabase = require("../supabase/imagestorage");

async function uploadToSupabase(file) {
  const fileName = `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from("runescape-items")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } = supabase.storage
    .from("runescape-items")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

const upload = multer({ storage: multer.memoryStorage() });

const indexRouter = Router();

indexRouter.post("/items/create", upload.single("image"), async (req, res) => {
  const { name, category } = req.body;

  let params = null;

  let ref = null;
  if (req.file) {
    ref = await uploadToSupabase(req.file);
  }

  let members = req.body.wepMem ? true : false;

  switch (category) {
    case "weapons":
      console.log("weapon type: ", req.body.wepType);

      params = {
        name: name,
        members: members,
        requirements: req.body.wepReq || "",
        price: parseInt(req.body.wepPrice) || 0,
        weight: parseFloat(req.body.wepWeight) || 0,
        type: req.body.wepType,
        ref: ref,
      };
      await weaponsDB.createWeapon(params);
      res.redirect("/weapons");
      break;
    case "armour":
      members = req.body.members ? true : false;
      params = {
        name: name,
        members: req.body.armMem ? true : false,
        requirements: req.body.armReq || "",
        price: parseInt(req.body.armPrice) || 0,
        weight: parseFloat(req.body.armWeight) || 0,
        type: req.body.armourType,
        ref: ref,
      };
      await armourDB.createArmour(params);
      res.redirect("/armour");
      break;
    case "potions":
      params = {
        name: name,
        members: req.body.potMem ? true : false,
        effect: req.body.effect || "",
        price: parseInt(req.body.potPrice) || 0,
        weight: parseFloat(req.body.potWeight) || 0,
        ref: ref,
      };
      await potionDB.createPotion(params);
      res.redirect("/potions");
      break;
    case "food":
      params = {
        name: name,
        members: req.body.foodMem ? true : false,
        heal: req.body.heal || "",
        price: parseInt(req.body.foodPrice) || 0,
        weight: parseFloat(req.body.foodWeight) || 0,
        ref: ref,
      };
      await foodDB.createFood(params);
      res.redirect("/food");
      break;
  }

  // save to database...
  // name, category, imagePath
});

indexRouter.get("/", (req, res) => {
  res.render("index");
});

module.exports = indexRouter;
