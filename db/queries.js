const pool = require("./pool");

async function getAllWeapons() {
  const { rows } = await pool.query("SELECT * FROM weapons ORDER BY id");
  console.log(rows);
  return rows;
}

module.exports = {
  getAllWeapons,
  getWeapon,
  updateWeapon,
  deleteWeapon,
  createWeapon,
};

async function getWeapon(id) {
  const { rows } = await pool.query(`SELECT * FROM weapons WHERE id = ${id}`);
  // console.log("weapon: ", rows);
  return rows[0];
}

async function updateWeapon(params) {
  const query = `
  UPDATE weapons
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

    console.log("updated weapon: ", rows[0]);
  } catch (err) {
    console.log("members: ", params.members);

    console.log(typeof params.price);
    console.error("error updating weapon: ", err);
  }
  return dbRows;
}

async function deleteWeapon(id) {
  const query = `DELETE FROM weapons WHERE id = $1;`;
  const value = [id];
  try {
    await pool.query(query, value);
  } catch (err) {
    console.error("error deleting weapon: ", err);
  }
}

async function createWeapon(params) {
  const query = `INSERT INTO weapons (name, members, requirements, price, weight, type, ref)
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
    console.error("error inserting weapon: ", err);
  }
}
