const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    users: Array,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Message', messageSchema, 'messages')