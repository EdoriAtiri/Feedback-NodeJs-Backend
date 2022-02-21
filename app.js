require('dotenv').config()
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
  await mongoose.connect(
    'mongodb+srv://admin-edori:global1993@cluster0.avfes.mongodb.net/feedbackDB',
    {
      useNewUrlParser: true,
    }
  )
}
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const feedbackRouter = require('./routes/feedbacks')
app.use('/feedbacks', feedbackRouter)

// Requests Targeting all feedbacks
// app
//   .route('/feedbacks')

//   .post((req, res) => {
//     console.log(req.body)
//     Feedback.create(
//       {
//         rating: req.body.rating,
//         text: req.body.text,
//       },
//       (err, result) => {
//         if (err) {
//           res.send(`error occured while trying to post new feedback - ${err}`)
//         } else {
//           res.send(result)
//         }
//       }
//     )
//   })

// //   Requests Targeting a specific feedback
// app
//   .route('/feedbacks/:feedbackID')
//   // Get one item by id
//   .get((req, res) => {
//     Feedback.findById(req.params.feedbackID, (err, foundFeedback) => {
//       if (err) {
//         res.send('Feedback not found')
//       } else {
//         res.send(foundFeedback)
//       }
//     })
//   })

//   //   Find one item by id and update
//   .put((req, res) => {
//     console.log(req.params.feedbackID)
//     Feedback.updateOne(
//       { _id: req.params.feedbackID },
//       {
//         rating: req.body.rating,
//         text: req.body.text,
//       },
//       (err, updatedFeedback) => {
//         if (err) {
//           res.send(err)
//           console.log(err)
//         } else {
//           res.send(updatedFeedback)
//           console.log(updatedFeedback)
//         }
//       }
//     )
//   })

//   //   Find item by id and delete
//   .delete((req, res) => {
//     Feedback.findByIdAndDelete(req.params.feedbackID, (err) => {
//       if (err) {
//         res.send(
//           `An error occured while deleting ${req.params.feedbackID}: ${err.message}`
//         )
//       } else {
//         res.send('successfully deleted item')
//       }
//     })
//   })

let port = process.env.PORT
if (port == null || port == '') {
  port = 5000
}

app.listen(port, function () {
  console.log('Server Started Successfully.')
})
