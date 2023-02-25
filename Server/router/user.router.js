const express= require("express");
const user= express.Router();
const UserModel = require('../modules/user.model');
const argon2i = require("argon2");
const jwt = require('jsonwebtoken');

user.use(express.json());


user.post("/signup",async (req,res)=>{
    const {name,email,phone,password}= req.body;
    const hashPassword = await argon2i.hash(password)
    let existingUser= await UserModel.findOne({email});

    if(existingUser){
        res.send({message: "User Already Exists!! Try using different Emani Id"});
    }
    else{
        let User= await new UserModel({name,email,phone,password:hashPassword});
        User.save();
        res.send({data: User})
    }
})

user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email});
    const decrypt_Pass= await argon2i.verify(user.password,password);

    if (user && decrypt_Pass) {
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        "UNI@245_wendor",        {
          expiresIn: "7 days",
        }
      );
     
      return res.send({ message: "Login Success", token });
    }
    return res.status(401).send("Invalid credentials");
  });

  module.exports= user;