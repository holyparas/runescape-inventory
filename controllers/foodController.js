const db = require("../db/foodQueries");

exports.foodListGet = async (req, res) => {
  const rows = await db.getAllFoods();

  res.render("food", { title: "Runescape - Food", rows: rows });
};

exports.foodGet = async (req, res) => {
  const row = await db.getFood(req.params.id);

  res.render("foodMain", { title: `RS- ${row.name}`, row: row });
};

exports.foodEditGet = async (req, res) => {
  const row = await db.getFood(req.params.id);

  res.render("foodEdit", { title: `RS- ${row.name}`, row: row });
};

exports.foodEditPost = async (req, res) => {
  console.log("controller members: ", req.body.members);
  let mem = req.body.members ? true : false;
  const params = {
    id: req.params.id, // from URL
    name: req.body.name, // from form input
    members: mem, // from form input (maybe 'true'/'false' or checkbox)
    heal: req.body.heal,
    price: req.body.price,
    weight: req.body.weight,
  };
  await db.updateFood(params);
  res.redirect(`/food/${req.params.id}`);
};

exports.foodDelete = async (req, res) => {
  console.log("came in food delete controller");
  const id = req.params.id;
  await db.deleteFood(id);
  res.redirect("/food");
};
