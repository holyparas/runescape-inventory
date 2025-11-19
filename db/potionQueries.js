const pool = require("./pool");

async function getAllPotions() {
  const { rows } = await pool.query("SELECT * FROM potions ORDER BY id");
  console.log(rows);
  return rows;
}

module.exports = {
  getAllPotions,
  getPotion,
  updatePotion,
  deletePotion,
  createPotion,
};

async function createPotion(params) {
  const query = `INSERT INTO potions (name, members, effect, price, weight, ref)
  VALUES($1, $2, $3, $4, $5, $6)`;

  const values = [
    params.name,
    params.members,
    params.effect,
    params.price,
    params.weight,
    params.ref,
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("error inserting potion: ", err);
  }
}

async function getPotion(id) {
  const { rows } = await pool.query(`SELECT * FROM potions WHERE id = ${id}`);
  // console.log("Potion: ", rows);
  return rows[0];
}

async function updatePotion(params) {
  const query = `
  UPDATE potions
  SET name = $1, members = $2, effect = $3,
  price = $4, weight = $5
  WHERE id = $6
  RETURNING *;`;

  const values = [
    params.name,
    params.members,
    params.effect,
    params.price,
    params.weight,
    params.id,
  ];
  console.log("POTION ", values);
  console.log("potion params: ", params);

  let dbRows;
  try {
    const { rows } = await pool.query(query, values);
    dbRows = rows[0];
    console.log("members: ", params.members);

    console.log("updated Potion: ", rows[0]);
  } catch (err) {
    console.log("members: ", params.members);

    console.log(typeof params.price);
    console.error("error updating Potion: ", err);
  }
  return dbRows;
}

async function deletePotion(id) {
  const query = `DELETE FROM potions WHERE id = $1;`;
  const value = [id];
  try {
    await pool.query(query, value);
  } catch (err) {
    console.error("error deleting Potion: ", err);
  }
}
