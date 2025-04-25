const express = require("express");
const User = require("../models/user");
const { checkAndUpdateStreakOnLogin } = require("../utils/checkAndUpdateStreakOnLogin");

const router = express.Router();

router.patch("/checkStreak", async (req, res) => {
  const { clerkUserId } = req.body;

  if (!clerkUserId) {
    return res.status(400).json({ message: "Missing Clerk UserId" });
  }

  try {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedStreak = await checkAndUpdateStreakOnLogin(user);

    res.status(200).json({
      message: "Streak updated successfully",
      streak: updatedStreak,
    });
  } catch (error) {
    console.error("Error checking streak:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
