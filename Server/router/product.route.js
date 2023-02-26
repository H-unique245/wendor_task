const express = require("express");
const ProductModel = require("../modules/product.model");
const jwt = require("jsonwebtoken");

const product = express.Router();

express.json();

// title,description,price,image_url,user_id
product.get("/", async (req, res) => {
  try {
    let check_product = await ProductModel.find({}).populate({
      path: "user_id",
    });
    res
      .status(200)
      .send({ message: "All Procuct Details", data: check_product });
  } catch (err) {
    res.send({ message: err.message });
  }
});

product.get("/:id", async (req, res) => {
  let Id = req.params.id;
  try {
    let check_product = await ProductModel.findOne({ _id: Id });
    let product_detail = await check_product.populate({
      path: "user_id",
      user_id: check_product.user_id,
    });
    // console.log(product_detail);
    res.status(200).send({ message: "Procuct Details", data: product_detail });
  } catch (err) {
    res.send({ message: err.message });
  }
});

product.post("/add", (req, res) => {
  const token = req.headers["authorization"];
  const { title, description, price, image_url } = req.body;

  try {
    const verification = jwt.verify(token, "UNI@245_wendor");
    if (verification) {
      const decoded = jwt.decode(token);
      let user_id = decoded.id;
      let product_data = new ProductModel({
        title,
        description,
        price,
        image_url,
        user_id,
      });
      product_data.save();
      res
        .status(201)
        .send({ message: "Product added successfully!!", data: product_data });
    } else {
      res.send({ message: "You are not authorize to add product!" });
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

product.delete("/:id", async (req, res) => {
  let Id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: Id });
    res.send({ message: "Procuct Deleted Successfully!!" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = product;
