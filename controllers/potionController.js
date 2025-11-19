const db = require("../db/potionQueries");

exports.potionListGet = async (req, res) => {
  const rows = await db.getAllPotions();

  res.render("potion", { title: "Runescape - Potion", rows: rows });
};

exports.potionGet = async (req, res) => {
  const row = await db.getPotion(req.params.id);

  res.render("potionMain", { title: `RS- ${row.name}`, row: row });
};

exports.potionEditGet = async (req, res) => {
  const row = await db.getPotion(req.params.id);

  res.render("potionEdit", { title: `RS- ${row.name}`, row: row });
};

exports.potionEditPost = async (req, res) => {
  console.log("controller members: ", req.body.members);
  let mem = req.body.members ? true : false;
  const params = {
    id: req.params.id, // from URL
    name: req.body.name, // from form input
    members: mem, // from form input (maybe 'true'/'false' or checkbox)
    effect: req.body.effect,
    price: req.body.price,
    weight: req.body.weight,
  };
  await db.updatePotion(params);
  res.redirect(`/potions/${req.params.id}`);
};

exports.potionDelete = async (req, res) => {
  console.log("came in potion delete controller");
  const id = req.params.id;
  await db.deletePotion(id);
  res.redirect("/potions");
};
