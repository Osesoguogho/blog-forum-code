const express = require("express");
const bcrypt = require("bcrypt");
const {users} = require( "../model/model");
const jwt = require("jsonwebtoken");
 const env = require("dotenv");
const authorize = require("../utils/middleware");
 env.config();


const router = express.Router();

//Register route
 router.post("/register", async (req, res)=> {
const {name, email, password} = req.body;
 try {
    const userz = await users.findOne({email: email});
    if (userz) {
      return res.status(400).json({message:"user already exist, please log in"});
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await users.create({name: name, email: email, password: bcryptPassword});
    console.log(newUser);
     

    const token = jwt.sign( {id: newUser._id, name: newUser.name}, process.env.jwtSecret, { expiresIn: "600h" });

   return res.json(token);

 } catch (error) {
    console.error(error.message);
    res.status(501).json("server error", error.message)
 }
 });

 router.post("/login", async(req, res)=>{
   const {email, password} = req.body;

   try {
    const user = await users.findOne({email: email});
    console.log(user);
    if(!user) return res.status(401).json("email or password incorrect");

    const validEmail = await bcrypt.compare(password, user.password);
    console.log(validEmail);
    if (!validEmail) return res.status(401)("email or password incorrect");


    const token = jwt.sign( {id: user._id, name: user.name}, process.env.jwtSecret, { expiresIn: "2h" });

    return res.json(token);
   } catch (error) {
    console.log(error.message);
    res.status(500).json("server error")
   }
 })

 router.post("/verify", authorize, async(req, res) => {
try {
  return res.json({status:true})
} catch (error) {
  console.log(error.message);
  res.status(500).json("server error")
}
 })
 router.get("/verify", async(req, res) => {
try {
  return res.json({status:true})
} catch (error) {
  console.log(error.message);
  res.status(500).json("server error")
}
 })




 module.exports = router;