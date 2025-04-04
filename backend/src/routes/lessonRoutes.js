const express = require("express");
const LessonContent = require("../models/lessonContent");
const LessonCategory= require("../models/lessonCategory");
const { default: mongoose } = require("mongoose");



const router=express.Router();


//all categories
router.get("/categories",async(req, res)=>{
    try{
        const categories=await LessonCategory.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message:"Error fetching categories",error});
    }
});

//all lessons in a category
router.get("/lessons/category/:categoryID", async (req, res) => {
    try {
        const { categoryID } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryID)) {
            console.log("Invalid ObjectId format:", categoryID);
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const categoryObjectID= new mongoose.Types.ObjectId(categoryID)
        const lessons = await LessonContent.find({ category:categoryObjectID})
            .select("title");


        if (!lessons.length) {
            console.log("No lessons found for category:", categoryID);
            return res.status(404).json({ message: "No lessons found for this category" });
        }

        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: "Error fetching lessons by category", error: error.message });
    }
});

/*router.get("/lessons/category/:categoryID",async(req,res)=>{
    try{
        const {categoryID}=req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryID)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const lessons=(await LessonContent.find({category:categoryID})).select("title");

        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: "No lessons found for this category" });
        }

        res.status(200).json(lessons);
    }catch(error){
        res.status(500).json({message:"Error fetching lessons by category",error});
    };
});*/

//Get a single lesson
router.get("/lessons/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const lessons = await LessonContent.findById(id).populate("category");

        if(!lessons){
            return res.status(404).json({message:"Lesson not found"});
        }

        res.status(200).json(lessons);
    }catch(error){
        res.status(500).json({message:"Error Fetching lesson",error})
    }   
});

module.exports=router;

