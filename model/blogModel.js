const { text } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title :{
        type : String,
        unique: true
    },
    subtitle:{
        type: String
    },
    descriptio:{
        type: Text
    },
    image:{
        type: String
    }
})
const blog = mongoose.model('blog',blogSchema);
module.exports = blog;


