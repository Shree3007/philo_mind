const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const { updateStreak } = require("../utils/updateStreak");


router.patch("/updateStatus", async (req, res) => {
  const { clerkUserId, lessonId, status } = req.body;

  console.log("Received update request:", { clerkUserId, lessonId, status });

  if (!clerkUserId || !lessonId || typeof status !== "boolean") {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const progressItem = user.progress.find(
      (item) => item.lessonId.toString() === lessonId
    );

    if (progressItem) {
      progressItem.status = status;
      progressItem.completedAt = status ? new Date() : null;
    } else {
      user.progress.push({
        lessonId,
        status,
        completedAt: status ? new Date() : null,
      });
    }

    if (status === true) {
      await updateStreak(user);
    }

    await user.save();
    res.status(200).json({ message: "Lesson status updated successfully" });
  } catch (error) {
    console.error("Error updating lesson status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
