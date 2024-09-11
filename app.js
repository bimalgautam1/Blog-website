const express = require('express');
const app = express();
const mongoose = require("mongoose");
const connecttodb = require('./database/index.js');
const blog = require('./model/blogModel.js');
// const multer = require('multer');
const {multer, storage} = require('./middleware/multerConfig.js');
const upload = multer({storage:storage});
require('dotenv').config();
app.use(express.json());


connecttodb();


app.get("/", (req,res)=>{
    res.status(202).send("Hello World");
})

app.post("/blog",upload.single('image'), async(req,res)=>{
    //only text content from frontend always comes in req.body

    const {title,discription,image,subtitle} = req.body;
    const filename = req.file.filename;
    if(!title || !discription || !subtitle){
        return res.status(400).json({
            message: "Please enter title, discription, subtitle"
        })
    }

    await blog.create({
        title,discription,image,subtitle,
        image:filename
    })
    res.status(200).json({
        message : "Blog api hit success"
    })
});

app.get("/blog", async (req,res)=>{
    const blogs = await blog.find(); //find returns array
    res.status(200).json({
        message: "Data found successfully",
        data: blogs
    })
})

app.get("/blog/:id",async(req,res)=>{
    const id = req.params.id;
    const blogId = await blog.findById(id) //object return
    if(!blogId){
        res.status(404).json({
            message:"Blog not found"
        })
    }
    else{
        res.status(200).json({
        message:"fetched success",
        data: blogId
    })}
})

app.get("/about", (req,res)=>{
    res.json({
        message:"This is about section"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('New Project 1');
})







