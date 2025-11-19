const db = require("../db/queries");

exports.weaponsListGet = async (req, res) => {
  const rows = await db.getAllWeapons();

  res.render("weapons", { title: "Runescape - Weapons", rows: rows });
};

exports.weaponGet = async (req, res) => {
  const row = await db.getWeapon(req.params.id);

  res.render("weaponsMain", { title: `RS- ${row.name}`, row: row });
};

exports.weaponEditGet = async (req, res) => {
  const row = await db.getWeapon(req.params.id);

  res.render("weaponsEdit", { title: `RS- ${row.name}`, row: row });
};

exports.weaponEditPost = async (req, res) => {
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
  await db.updateWeapon(params);
  res.redirect(`/weapons/${req.params.id}`);
};

exports.weaponDelete = async (req, res) => {
  const id = req.params.id;
  await db.deleteWeapon(id);
  res.redirect("/weapons");
};
