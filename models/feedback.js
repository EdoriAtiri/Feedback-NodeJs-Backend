const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Feedback', feedbackSchema)
