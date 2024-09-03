const express = require('express');
const app = express();
const mongoose = require("mongoose");
const connecttodb = require('./database/index.js');
const blog = require('./model/blogModel.js');
require('dotenv').config();
app.use(express.json());

connecttodb();


app.get("/", (req,res)=>{
    res.status(202).send("Hello World");
})

app.post("/blog", async(req,res)=>{
    //only text content from frontend always comes in req.body

    const {title,discription,image,subtitle} = req.body;
    if(!title || !discription || !image || !subtitle){
        return res.status(400).json({
            message: "Please enter title, image, discription, subtitle"
        })
    }

    await blog.create({
        title,discription,image,subtitle
    })
    res.status(200).json({
        message : "Blog api hit success"
    })
});

app.listen(process.env.PORT, ()=>{
    console.log('New Project 1');
})







