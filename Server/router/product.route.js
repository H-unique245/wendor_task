const express = require("express");
const ProductModel = require("../modules/product.model");
const jwt = require("jsonwebtoken");
require("dotenv");

// title,description,price,image_url,user_id
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The product title
 *         description:
 *           type: string
 *           description: The product description
 *         price:
 *           type: number
 *           description: The product price
 *         user_id:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: The user details  in relatioship with product
 *       example:
 *         id: 63fc9b009ea4823245cca0b6
 *         title: Sample Product 1
 *         description: this sample product added from user 1
 *         image_url: https://fakeimg.pl/420x320/ff0000%2C128/333333%2C255/?text=Defult%20Image&font=lobster
 *         price: 987 
 *         user_id: 63fbb4b18502d1c86c36a08a
 * 
 */
const product = express.Router();
 /**
  * @swagger
  * tags:
  *   name: Products
  *   description: The products managing API
  */

product.use(express.json());



/**
 * @swagger
 * /product:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
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

/**
 * @swagger
 * /product/usersProduct:
 *   get:
 *     summary: Get the book by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

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


/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

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
    res.status(404).send({ message: err.message });
  }
});

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully!!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Some server error
 */
product.post("/add", (req, res) => {
  const token = req.headers["authorization"];
  const { title, description, price, image_url } = req.body;

  try {
    const verification = jwt.verify(token, process.env.JWT_SECRET_KEY);
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

/**
 * @swagger
 * /product/delete/{id}:
 *  delete:
 *    summary: Delete the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Product Deleted Successfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Error message
 *      500:
 *        description: Some error happened
 */
product.delete("/:id", async (req, res) => {
  let Id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: Id });
    res.send({ message: "Procuct Deleted Successfully!!" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

/**
 * @swagger
 * /product/edit/{id}:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Product Updated Successfully!!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Error message
 *      500:
 *        description: Some error happened
 */
product.put("/edit/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const UpdateProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    await UpdateProduct.save();
    res.send({ message: "Product Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = product;

