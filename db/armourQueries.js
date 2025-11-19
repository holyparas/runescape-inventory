const pool = require("./pool");

async function getAllArmours() {
  const { rows } = await pool.query("SELECT * FROM armour ORDER BY id");
  console.log(rows);
  return rows;
}

module.exports = {
  getAllArmours,
  getArmour,
  updateArmour,
  deleteArmour,
  createArmour,
};

async function getArmour(id) {
  const { rows } = await pool.query(`SELECT * FROM armour WHERE id = ${id}`);
  // console.log("Armour: ", rows);
  return rows[0];
}

async function updateArmour(params) {
  const query = `
  UPDATE armour
  SET name = $1, members = $2, requirements = $3,
  price = $4, weight = $5, type = $6
  WHERE id = $7
  RETURNING *;`;

  const values = [
    params.name,
    params.members,
    params.requirements,
    params.price,
    params.weight,
    params.type,
    params.id,
  ];

  let dbRows;
  try {
    const { rows } = await pool.query(query, values);
    dbRows = rows[0];
    console.log("members: ", params.members);

    console.log("updated Armour: ", rows[0]);
  } catch (err) {
    console.log("members: ", params.members);

    console.log(typeof params.price);
    console.error("error updating Armour: ", err);
  }
  return dbRows;
}

async function deleteArmour(id) {
  const query = `DELETE FROM armour WHERE id = $1;`;
  const value = [id];
  try {
    await pool.query(query, value);
  } catch (err) {
    console.error("error deleting Armour: ", err);
  }
}

async function createArmour(params) {
  const query = `INSERT INTO armour (name, members, requirements, price, weight, type, ref)
  VALUES($1, $2, $3, $4, $5, $6, $7)`;

  const values = [
    params.name,
    params.members,
    params.requirements,
    params.price,
    params.weight,
    params.type,
    params.ref,
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("error inserting armour: ", err);
  }
}
