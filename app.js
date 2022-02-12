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
        console.log(foundFeedback)
        res.send(foundFeedback)
      }
    })
  })

  .post((req, res) => {
    Feedback.create(
      {
        rating: req.body.rating,
        text: req.body.text,
      },
      (err) => {
        if (err) {
          res.send(`error occured while trying to post new feedback - ${err}`)
        } else {
          res.send('successfully posted new feedback')
          console.log('works')
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
    Feedback.findByIdAndUpdate(
      req.params.feedbackID,
      {
        rating: req.body.rating,
        text: req.body.text,
      },
      (err) => {
        if (err) {
          res.send(err)
          console.log(err)
        } else {
          res.send('Update successful')
        }
      }
    )
  })

  //   Find item by id and delete it
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

app.listen(3000, function () {
  console.log('Server started on port 3000')
})
