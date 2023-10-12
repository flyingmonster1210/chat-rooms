const Message = require('../models/messageModel')

/*
 * @Desc:  Create a message in DB
 * @Route: POST /add
 * @Param: req.body: {message, users, senderId}
 */
const addMessage = async (req, res, next) => {
  try {
    const body = req.body

    let errorMsg = 'Missing required field(s).'
    if (body && body.message && body.users && body.senderId) {
      const newMessage = await Message.create(body)
      if (newMessage) {
        return res.json({
          statue: true,
          message: body.message,
        })
      }
      else {
        errorMsg = 'Database return nothing.'
      }
    }

    return res.json({
      statue: false,
      message: errorMsg,
    })
  } catch (error) {
    console.error(error.message || error)
    next(error.message || error)
  }
}




module.exports = {
  addMessage,
}