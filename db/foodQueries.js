const pool = require("./pool");

async function getAllFoods() {
  const { rows } = await pool.query("SELECT * FROM food ORDER BY id");
  console.log(rows);
  return rows;
}

module.exports = {
  getAllFoods,
  getFood,
  updateFood,
  deleteFood,
  createFood,
};

async function createFood(params) {
  const query = `INSERT INTO food (name, members, heal, price, weight, ref)
  VALUES($1, $2, $3, $4, $5, $6)`;

  const values = [
    params.name,
    params.members,
    params.heal,
    params.price,
    params.weight,
    params.ref,
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("error inserting food: ", err);
  }
}

async function getFood(id) {
  const { rows } = await pool.query(`SELECT * FROM food WHERE id = ${id}`);
  // console.log("Food: ", rows);
  return rows[0];
}

async function updateFood(params) {
  const query = `
  UPDATE food
  SET name = $1, members = $2, heal = $3,
  price = $4, weight = $5
  WHERE id = $6
  RETURNING *;`;

  const values = [
    params.name,
    params.members,
    params.heal,
    params.price,
    params.weight,
    params.id,
  ];

  let dbRows;
  try {
    const { rows } = await pool.query(query, values);
    dbRows = rows[0];
    console.log("members: ", params.members);

    console.log("updated Food: ", rows[0]);
  } catch (err) {
    console.log("members: ", params.members);

    console.log(typeof params.price);
    console.error("error updating Food: ", err);
  }
  return dbRows;
}

async function deleteFood(id) {
  const query = `DELETE FROM food WHERE id = $1;`;
  const value = [id];
  try {
    await pool.query(query, value);
  } catch (err) {
    console.error("error deleting Food: ", err);
  }
}
