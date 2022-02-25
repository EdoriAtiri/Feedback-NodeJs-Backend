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
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
}
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const feedbackRouter = require('./routes/feedbacks')
app.use('/feedbacks', feedbackRouter)

let port = process.env.PORT
if (port == null || port == '') {
  port = 5000
}

app.listen(port, function () {
  console.log('Server Started Successfully.')
})
