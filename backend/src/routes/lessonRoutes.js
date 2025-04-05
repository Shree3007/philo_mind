const express = require("express");
const LessonContent = require("../models/lessonContent");
const LessonCategory= require("../models/lessonCategory");
const { default: mongoose } = require("mongoose");
const User = require("../models/user")



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
router.get("/lessons/category/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { clerkUserId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        // Get all lessons under the given category
        const lessons = await LessonContent.find({ category: categoryId }).select("title _id");

        if (!lessons.length) {
            return res.status(404).json({ message: "No lessons found in this category" });
        }

        // Get user's progress
        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a map of completed lessons for fast lookup
        const progressMap = {};
        user.progress.forEach((item) => {
            if (item.status === true) {
                progressMap[item.lessonId.toString()] = true;
            }
        });

        // Combine lesson data with user progress status
        const result = lessons.map((lesson) => ({
            lessonId: lesson._id,
            title: lesson.title,
            status: progressMap[lesson._id.toString()] || false
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching lessons by category with progress:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

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

