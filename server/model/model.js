const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true}
});

const users = mongoose.model("users", userSchema);

const contactSchema = new mongoose.Schema({
    name:{type: String, require: true},
    email:{type: String, require: true},
    phone:{type: Number, require: true},
    message:{type: String, require: true}
    
});

const contact = mongoose.model("contact", contactSchema);


const contentSchema = new mongoose.Schema({
    images: [{filename:{type:String}, originalname:{type: String}}],
    title:{type: String, require: true},
    category:{type: String, require: true},
    description:{type: String, require: true},
    postedBy:{type:mongoose.SchemaTypes.ObjectId, ref:"users"},
    createdAt:{type: Date, default: Date.now},
    comments: [{
        text:{type: String},
    postedBy:{type: mongoose.SchemaTypes.ObjectId, ref: "users"},
    created: {type: Date, default: Date.now}
    }]
});

const content = mongoose.model("content", contentSchema);

module.exports = {users, content, contact};