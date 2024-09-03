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
    discription:{
        type: String
    },
    image:{
        type: String
    }
})
const blog = mongoose.model('blog',blogSchema);//blog is a table adn blogSchema is columns in table
module.exports = blog;


