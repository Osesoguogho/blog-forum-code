const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
require("./utils/crons")


const app = express();
 const port = 3800;

 app.use(cors());
 app.use('/uploads', express.static('./uploads'))
 app.use(express.json()); 
 app.use(express.urlencoded({extended: false}));
 
//  mongoose.connect("mongodb://localhost:27017/blogspot").then(()=> console.log("connected")).catch((error)=> console.log(error.message));
 mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`).then(()=> console.log("connected")).catch((error)=> console.log(error.message));

app.use("/api", require("./routes/dashboard"));
 app.use("/api", require("./routes/router"));

 app.listen(port, () =>{
    console.log(`application on port ${port}`);
 })
