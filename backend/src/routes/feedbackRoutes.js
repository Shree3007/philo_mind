const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedBack');
const User = require('../models/user'); // needed to find MongoDB user

// Submit feedback
router.post('/submit-feedback', async (req, res) => {
  try {
    const { clerkUserId, categoryId, feedbackText, isAnonymous } = req.body;

    let userId = null;

    if (!isAnonymous) {
      const mongoUser = await User.findOne({ clerkUserId });
      if (!mongoUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      userId = mongoUser._id;
    }

    const feedback = new Feedback({
      categoryId,
      userId,
      feedbackText,
      isAnonymous
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
