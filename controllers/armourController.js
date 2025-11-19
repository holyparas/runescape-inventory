const db = require("../db/armourQueries");

exports.armourListGet = async (req, res) => {
  const rows = await db.getAllArmours();

  res.render("armour", { title: "Runescape - Armour", rows: rows });
};

exports.armourGet = async (req, res) => {
  const row = await db.getArmour(req.params.id);

  res.render("armourMain", { title: `RS- ${row.name}`, row: row });
};

exports.armourEditGet = async (req, res) => {
  const row = await db.getArmour(req.params.id);

  res.render("armourEdit", { title: `RS- ${row.name}`, row: row });
};

exports.armourEditPost = async (req, res) => {
  console.log("controller members: ", req.body.members);
  let mem = req.body.members ? true : false;
  const params = {
    id: req.params.id, // from URL
    name: req.body.name, // from form input
    members: mem, // from form input (maybe 'true'/'false' or checkbox)
    requirements: req.body.requirements,
    price: req.body.price,
    weight: req.body.weight,
    type: req.body.type,
  };
  await db.updateArmour(params);
  res.redirect(`/armour/${req.params.id}`);
};

exports.armourDelete = async (req, res) => {
  console.log("came in armour delete controller");
  const id = req.params.id;
  await db.deleteArmour(id);
  res.redirect("/armour");
};
