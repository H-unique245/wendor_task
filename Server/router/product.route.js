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

product.get("/usersProduct", async (req, res) => {
  const token = req.headers["authorization"];

  try {
    const verification = jwt.verify(token, "UNI@245_wendor");
    if (verification) {
      const decoded = jwt.decode(token);
      let userId = decoded.id;
      let find_product = await ProductModel.find({ user_id: userId }).populate({
        path: "user_id",
      });
      res
        .status(200)
        .send({ message: "Product data for the user!!", data: find_product });
    } else {
      res.send({ message: "You are not authorize to add product!" });
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
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

product.put('/edit/:id', async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
      const UpdateProduct = await ProductModel.findByIdAndUpdate({_id:id},payload);
      await UpdateProduct.save();
      res.send({ message: "Product Updated Successfully!!" })
  } catch (err) {
      res.status(400).send({ message: err.message })
  }
})

module.exports = product;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRhY2I4OTlmM2Y4Y2Q0ZTkzNTQyMiIsIm5hbWUiOiJCYXRtYW4iLCJlbWFpbCI6ImJhdG1hbkBnYW1pbC5jb20iLCJpYXQiOjE2Nzc1Njk5MjMsImV4cCI6MTY3ODE3NDcyM30.ESJf6zeGQPkN_Xm_S2XTv12EIZKcPVhm5ZFg_K8V4XU
