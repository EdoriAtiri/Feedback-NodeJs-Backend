const express = require('express')
const router = express.Router()
const Feedback = require('../models/feedback')

//   Getting all
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.json(feedbacks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
  const feedback = {
    rating: req.body.rating,
    text: req.body.text,
  }

  try {
    const newFeedback = await Feedback.create(feedback)
    res.status(201).json(newFeedback)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get one
router.get('/:id', getFeedback, async (req, res) => {
  res.json(res.feedback)
})

// Update one
router.patch('/:id', getFeedback, async (req, res) => {
  if (req.body.rating != null) res.feedback.rating = req.body.rating
  if (req.body.text != null) res.feedback.text = req.body.text

  try {
    const updatedFeedback = await res.feedback.save()
    res.json(updatedFeedback)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete one
router.delete('/:id', getFeedback, async (req, res) => {
  try {
    await res.feedback.remove()
    res.json({ message: 'Deleted feedback successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Middleware
async function getFeedback(req, res, next) {
  let feedback
  try {
    feedback = await Feedback.findById(req.params.id)
    if (feedback == null) {
      res.status(404).json({ message: 'Feedback not found' })
      return
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.feedback = feedback
  next()
}

module.exports = router
