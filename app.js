const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/indexRouter");
const weaponsRouter = require("./routes/weaponsRouter");
const armourRouter = require("./routes/armourRouter");
const foodRouter = require("./routes/foodRouter");
const potionRouter = require("./routes/potionRouter");

app.use("/", indexRouter);
app.use("/weapons", weaponsRouter);
app.use("/armour", armourRouter);
app.use("/food", foodRouter);
app.use("/potions", potionRouter);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log("express app listening on port", PORT);
});
