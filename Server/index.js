require('dotenv');
const express = require("express");
const cors= require("cors");
const { Connection } = require("./config/db");
// const UserModel = require('./modules/user.model');
// const argon2i = require("argon2");
const UserRoute= require("./router/user.router");
// const jwt = require('jsonwebtoken');
const PORT= process.env.PORT;
const app= express();

app.use(express.json());
app.use(cors());
app.use("/user",UserRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to Inventory Backend!! \n This is inventory API from Wendor AI.");
})


app.post("/addProduct", (req,res)=>{
    
})

app.listen(PORT, async () => {
    try {
      await Connection;
      console.log("connected to db successfully");
    } catch (err) {
      console.log("Error:connecting error");
      console.log(err);
    }
  
    console.log(`Server is started at http://localhost:${PORT}`);
  });