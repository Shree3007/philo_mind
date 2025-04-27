const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LessonCategory', // assuming your categories are stored separately
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null, // for anonymous feedbacks
  },
  feedbackText: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('feedBack', feedbackSchema);
