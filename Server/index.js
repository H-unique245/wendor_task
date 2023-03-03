const express = require("express");
const cors = require("cors");
const { Connection } = require("./config/db");
const UserRoute = require("./router/user.router");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const ProductRoute = require("./router/product.route");
require("dotenv");

const PORT = process.env.PORT;
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Product Inventory API",
			version: "1.0.0",
			description: "This is backend API of inventory application as per assesment test of Wendor.",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
      {
				url: "https://wendor-inventory-api.onrender.com",
			},
		],
	},
	apis: ["./router/*.js"],
};
const specs = swaggerJsDoc(options);
const app = express();

app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));
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
