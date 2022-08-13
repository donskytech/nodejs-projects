const mongoose = require("mongoose")

const KeyCodeSchema = new mongoose.Schema({
  keyCode: {
    type: String,
    unique: true,
    required: true
  },
  active: {
    type: Boolean
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true })

KeyCodeSchema.index({keyCode: 1}, {unique: true})

module.exports = mongoose.model("KeyCode", KeyCodeSchema)