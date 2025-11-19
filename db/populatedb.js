const { Client } = require("pg");

//TODO ADD OTHER categories: potions, food, armour

const SQL_FOOD = `
CREATE TABLE IF NOT EXISTS food(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  members BOOL,
  heal TEXT,
  price INTEGER,
  weight FLOAT,
  ref TEXT
);

INSERT INTO food (name, members, heal, price, weight, ref)
VALUES
  ('Anchovy Pizza', FALSE, 'Heals 18 HP (9 per half)', 500, 0.4, 'food/anchovypizza.png'),
  ('Anglerfish', TRUE, 'Heals up to 22 HP (scales with HP level)', 2500, 0.2, 'food/anglerfish.png'),
  ('Cake', FALSE, 'Heals 12 HP (4 per slice)', 300, 0.6, 'food/cake.png'),
  ('Karambwan', TRUE, 'Heals 18 HP and can be eaten instantly after other food', 2000, 0.2, 'food/karambwan.png'),
  ('Lobster', FALSE, 'Heals 12 HP', 150, 0.3, 'food/lobster.png'),
  ('Manta Ray', TRUE, 'Heals 22 HP', 2500, 0.3, 'food/mantaray.png'),
  ('Salmon', FALSE, 'Heals 9 HP', 100, 0.2, 'food/salmon.png'),
  ('Shark', TRUE, 'Heals 20 HP', 1000, 0.3, 'food/shark.png'),
  ('Swordfish', FALSE, 'Heals 14 HP', 300, 0.3, 'food/swordfish.png'),
  ('Tuna', FALSE, 'Heals 10 HP', 150, 0.2, 'food/tuna.png'),
  ('Sea Turtle', TRUE, 'Heals 21 HP', 1800, 0.3, 'food/turtle.png'),
  ('Apple Pie', FALSE, 'Heals 14 HP (7 per half)', 200, 0.5, 'food/applepie.png');
`;

const SQL_POTIONS = `
CREATE TABLE IF NOT EXISTS potions(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  members BOOL,
  effect TEXT,
  price INTEGER,
  weight FLOAT,
  ref TEXT
);

INSERT INTO potions (name, members, effect, price, weight, ref)
VALUES
  ('Saradomin Brew', TRUE, 'Heals 15% HP and boosts Defence, but lowers Strength, Attack, Magic, and Ranged', 8000, 0.1, 'potions/saradominbrew.png'),
  ('Prayer Potion', FALSE, 'Restores Prayer points', 3000, 0.1, 'potions/prayer.png'),
  ('Magic Potion', FALSE, 'Boosts Magic level by 4', 1500, 0.1, 'potions/magic.png'),
  ('Super Restore', TRUE, 'Restores all stats except HP, and Prayer points', 5000, 0.1, 'potions/restore.png'),
  ('Ranging Potion', TRUE, 'Boosts Ranged level by 4', 2500, 0.1, 'potions/ranged.png'),
  ('Strength Potion', FALSE, 'Boosts Strength level by 3', 1000, 0.1, 'potions/strength.png'),
  ('Super Defence Potion', TRUE, 'Boosts Defence level by 5', 2000, 0.1, 'potions/defence.png');
`;
const SQL_ARMOUR = `
CREATE TABLE IF NOT EXISTS armour (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  members BOOL,
  requirements TEXT,
  price INTEGER,
  weight FLOAT,
  type TEXT,
  ref TEXT
);

INSERT INTO armour (name, members, requirements, price, weight, type, ref)
VALUES
  ('Green D''hide', FALSE, '40 Ranged', 12000, 4.0, 'Ranged', 'armour/greendhide.png'),
  ('Black D''hide', TRUE, '70 Ranged', 60000, 4.5, 'Ranged', 'armour/blackdhide.png'),
  ('Rune Armour', FALSE, '40 Defence', 50000, 12.0, 'Melee', 'armour/rune.png'),
  ('Dragon Armour', TRUE, '60 Defence', 300000, 15.0, 'Melee', 'armour/dragon.png'),
  ('Dharok''s Armour', TRUE, '70 Defence', 2000000, 25.0, 'Melee', 'armour/dharoks.png'),
  ('Karil''s Armour', TRUE, '70 Ranged', 1500000, 15.0, 'Ranged', 'armour/karils.png'),
  ('3rd Age Armour', TRUE, '65 Defence', 50000000, 10.0, 'Melee', 'armour/3rdage.png');
`;

const SQL_WEAPONS = `
CREATE TABLE IF NOT EXISTS weapons(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name TEXT,
members BOOL,
requirements TEXT,
price INTEGER,
weight FLOAT,
type TEXT,
ref TEXT
);

INSERT INTO weapons (name, members, requirements, price, weight, type, ref)
VALUES
  ('Armadyl Godsword', true, '75 ATTACK', '9000000', 10, 'Melee', 'weapons/ags.png'),
  ('Dragon Claws', TRUE, '60 Attack', 90000000, 2.0, 'Melee', 'weapons/dclaws.png'),
  ('Rune Scimitar', FALSE, '40 Attack', 15000, 1.8, 'Melee', 'weapons/rscim.png'),
  ('Rune 2h Sword', FALSE, '40 Attack', 30000, 3.0, 'Melee', 'weapons/r2h.png'),
  ('Dragon 2h Sword', TRUE, '60 Attack', 100000, 6.0, 'Melee', 'weapons/d2h.png'),
  ('Gravite 2h Sword', TRUE, '45 Attack', 200000, 3.6, 'Melee', 'weapons/g2h.png'),
  ('Granite Maul', TRUE, '50 Attack / 50 Strength', 120000, 2.7, 'Melee', 'weapons/gmaul.png'),
  ('Dragon Dagger (p++)', TRUE, '60 Attack', 30000, 0.5, 'Melee', 'weapons/dds.webp'),
  ('Voidwaker', TRUE, '75 Attack', 60000000, 2.7, 'Melee', 'weapons/voidwaker.png'),
  ('Nightmare Staff', TRUE, '65 Magic', 12000000, 5.0, 'Magic', 'weapons/nightmare.png'),
  ('Abyssal Whip', TRUE, '70 Attack', 2500000, 0.5, 'Melee', 'weapons/abbywhip.png'),
  ('Elder Maul', TRUE, '75 Attack', 80000000, 6.0, 'Melee', 'weapons/eldermaul.png'),
  ('Maple Shortbow', FALSE, '30 Ranged', 1000, 0.9, 'Ranged', 'weapons/maplesbow.png');
`;

require("dotenv").config();

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(`
  DROP TABLE IF EXISTS food, potions, armour, weapons CASCADE;
`);
  await client.query(SQL_WEAPONS);
  await client.query(SQL_ARMOUR);
  await client.query(SQL_FOOD);
  await client.query(SQL_POTIONS);
  await client.end();
  console.log("done");
}

main();
