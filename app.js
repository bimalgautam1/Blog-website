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
const fs = require('fs')


connecttodb();


app.get("/", (req,res)=>{
    res.status(202).send("Hello World");
})

app.post("/blog",upload.single('image'), async(req,res)=>{
    //only text content from frontend always comes in req.body

    const {title,discription,image,subtitle} = req.body;
    const filename = req.file.filename; //to select the image sent from client
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

app.delete("/blog/:id",async(req,res)=>{
    const id = req.params.id
    const blogDetails = blog.findById(id)
    const imageName = blogDetails.image
    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.error(err);
        }else{
            console.log('Data deleted success')
        }
        
    })
    await blog.findByIdAndDelete(id)
    res.status(200).json({
        message:"Deletion Complete"
    })
    })

app.patch('/blog/:id',upload.single('image'),async(req,res)=>{
    const id = req.params.id
    const {title,subtitle,discription}=req.body;
    let imageName;
    if(req.file){
        imageName = req.file.filename;
        const Blog = await blog.findById(id);
        const oldimageName = Blog.image;

        fs.unlink(`storage/${oldimageName}`,(err)=>{
            if(err){
                console.log(error);
            }
            else{
                console.log("File Updated Successfully");
            }
        })
    }
    await blog.findByIdAndUpdate(id,{
        title:title,
        subtitle:subtitle,
        discription:discription
    })
    res.status(200).json({
        message:"Blog updated Successfully"
    })
})


app.get("/about", (req,res)=>{
    res.json({
        message:"This is about section"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('New Project 1');
})







