const express = require ("express");
const User = require("../models/user");
const router=express.Router();

router.get("/profile/:clerkUserId", async (req, res) => {
    try {
      const { clerkUserId } = req.params;
      const user = await User.findOne({ clerkUserId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const completedlessons = user.progress.filter(
        (lesson) => lesson.status === true
      ).length;
  
      res.status(200).json({
        clerkUserId: user.clerkUserId,
        progress: completedlessons,
        streak: user.streak?.count || 0,
        badge: user.badge || "No Badge"
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  });
  
module.exports = router;
