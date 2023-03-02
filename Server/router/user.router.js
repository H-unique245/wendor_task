const express = require("express");
const UserModel = require("../modules/user.model");
const argon2i = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: User Name
 *         email:
 *           type: string
 *           description: User email
 *         phone:
 *           type: number
 *           description: User Contact number using to send SMS OTP
 *         password:
 *           type: string
 *           description: User password encrypted by using library argon2
 *         
 *       example:
 *         _id: 63fbb4b18502d1c86c36a08a 
 *         name: Sample4
 *         email: something5@gamil.com
 *         phone: 9876543214
 *         password: $argon2id$v=19$m=65536,t=3,p=4$zw0oOVZdjHQuW6q9E5VN8g$Vm7SGmdgluW8sbVs/lZs3igTk7C9y3q8zQWcfKkZ/WM
 *
 * 
 */

const user = express.Router();
user.use(express.json());

/**
  * @swagger
  * tags:
  *   name: User
  *   description: The users managing API
  */



/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User with name registered successfully!!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Some server error
 */
user.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashPassword = await argon2i.hash(password);
  let existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.send({ message: "User Already Exists!! Try using different Emani Id" });
  } else {
    let User = new UserModel({ name, email, phone, password: hashPassword });
    User.save();
    res.send({
      data: User,
      message: `User --> ${name} registered successfully!!`,
    });
  }
});

/**
 * @swagger
 * /user/loginwithphone:
 *   post:
 *     summary: User login with phone number
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login Success with phone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Some server error
 */
user.post("/loginwithphone", async (req, res) => {
  const { phone } = req.body;
  const user = await UserModel.findOne({ phone });

  if (user) {
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7 days",
      }
    );
    return res.status(200).send({ message: "Login Success with Phone", token });
  }
  return res.status(401).send({ message: "Invalid credentials" });
});


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login with email and passowrd
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Some server error
 */
user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const decrypt_Pass = await argon2i.verify(user.password, password);

  if (user && decrypt_Pass) {
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7 days",
      }
    );
    return res.send({ message: "Login Success", token });
  }
  return res.status(401).send("Invalid credentials");
});

module.exports = user;
