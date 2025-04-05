const express = require("express");
const User = require('../models/user');

const router = express.Router();
const LessonContent = require('../models/lessonContent')

router.post('/register', async (req, res) => {
    const { clerkUserId, email } = req.body;

    if (!clerkUserId || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const existingUser = await User.findOne({ clerkUserId });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists' });
        }

        // Step 1: Fetch all lessons
        const allLessons = await LessonContent.find({});

        // Step 2: Map lessons to default progress
        const progress = allLessons.map(lesson => ({
            lessonId: lesson._id,
            status: false,
        }));

        // Step 3: Create new user with progress
        const newUser = new User({ clerkUserId, email, progress });
        await newUser.save();

        res.status(201).json({ message: "User saved to DB" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Server error', error });
    }
});

module.exports=router;