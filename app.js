const express = require('express');
const app = express();
const mongoose = require("mongoose");
const connecttodb = require('./database/index.js');
require('dotenv').config();
app.use(express.json());

connecttodb();


app.get("/", (req,res)=>{
    res.status(202).send("Hello World");
})

app.post("/blog", (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        message : "Blog api hit success"
    })
});

app.listen(process.env.PORT, ()=>{
    console.log('New Project 1');
})





