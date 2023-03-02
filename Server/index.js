const express = require("express");
const cors = require("cors");
const { Connection } = require("./config/db");
const UserRoute = require("./router/user.router");
const ProductRoute = require("./router/product.route");
require("dotenv");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", UserRoute);
app.use("/product", ProductRoute);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Inventory Backend!! \n This is inventory API from Wendor AI."
  );
});

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected to database successfully!!");
  } catch (err) {
    console.log("Error:connecting error");
    console.log(err);
  }
  console.log(`Server is started at http://localhost:${PORT}`);
});
