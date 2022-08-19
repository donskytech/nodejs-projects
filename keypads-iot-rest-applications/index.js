const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const PORT = process.env.PORT || 3000

const app = express()

//setup dotenv
dotenv.config()

//middleware functions
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//setup mongoose
const mongodbConnString = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME_CONN}/${process.env.DB_NAME}`
// console.log(mongodbConnString);

mongoose.connect(mongodbConnString)

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Successfully connected to MongoDB Atlas database.")
})

//middleware function
app.use(require("./routes/keycodes/keycode"))

app.listen(PORT, function () {
  console.log(`Server app listening on port ${PORT}`)
})