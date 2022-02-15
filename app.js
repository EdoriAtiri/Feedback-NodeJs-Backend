const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB', {
    useNewUrlParser: true,
  })
}

const feedbackSchema = new mongoose.Schema({
  rating: Number,
  text: String,
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

// Requests Targeting all feedbacks
app
  .route('/feedbacks')

  .get((req, res) => {
    Feedback.find((err, foundFeedback) => {
      if (err) {
        console.log(err)
      } else {
        res.send(foundFeedback)
      }
    })
  })

  .post((req, res) => {
    console.log(req.body)
    Feedback.create(
      {
        rating: req.body.rating,
        text: req.body.text,
      },
      (err, result) => {
        if (err) {
          res.send(`error occured while trying to post new feedback - ${err}`)
        } else {
          res.send(result)
          //   console.log(result)
        }
      }
    )
  })

//   Requests Targeting a specific feedback
app
  .route('/feedbacks/:feedbackID')
  // Get one item by id
  .get((req, res) => {
    Feedback.findById(req.params.feedbackID, (err, foundFeedback) => {
      if (err) {
        res.send('Feedback not found')
      } else {
        res.send(foundFeedback)
      }
    })
  })

  //   Find one item by id and update
  .put((req, res) => {
    console.log(req.params.feedbackID)
    Feedback.updateOne(
      { _id: req.params.feedbackID },
      {
        rating: req.body.rating,
        text: req.body.text,
      },
      (err, updatedFeedback) => {
        if (err) {
          res.send(err)
          console.log(err)
        } else {
          res.send(updatedFeedback)
          console.log(updatedFeedback)
        }
      }
    )
  })

  //   Find item by id and delete
  .delete((req, res) => {
    Feedback.findByIdAndDelete(req.params.feedbackID, (err) => {
      if (err) {
        res.send(
          `An error occured while deleting ${req.params.feedbackID}: ${err.message}`
        )
      } else {
        res.send('successfully deleted item')
      }
    })
  })

app.listen(5000, function () {
  console.log('Server started on port 5000')
})
