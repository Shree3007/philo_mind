const express = require("express");
const User = require("../models/user");                   
const router = express.Router();

router.patch("/syncLessons",async(req,res)=>{
    const { clerkUserId, lessonId, status } = req.body;
      
    if (!clerkUserId || !lessonId || typeof status !== "boolean") {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }
    try{
        const user = await User.findOne({ clerkUserId });
              
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const allLessons = await LessonContent.find().select("_id");

        const allLessonIds = allLessons.map(lesson => lesson._id.toString());

        const existingProgressLessonIds = user.progress.map(p => p.lessonId.toString());

        const missingLessons = allLessonIds.filter(
            (id) => !existingProgressLessonIds.includes(id));
        
        const newProgressEntries = missingLessons.map(id => 
        ({
            lessonId: id,
            status: false
        }));
        
          user.progress.push(...newProgressEntries);
          await user.save();

          res.status(200).json({ message: "Lessons synced successfully", added: newProgressEntries.length });  
    }catch(error){
        
        console.error("Error syncing lessons for users:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;  
