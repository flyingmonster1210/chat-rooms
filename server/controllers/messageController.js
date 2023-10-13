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
    if (body && body.message && body.users) {
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

/*
 * @Desc:  Get messages between users
 * @Route: GET /get
 * @Param: req.params: {firstId, secondId}
 */
const getMessages = async (req, res, next) => {
  try {
    const params = req.params

    let errorMsg = 'Params not found.'
    if (params) {
      const { firstId, secondId } = params
      if (firstId && secondId) {
        const messages = await Message
          .find({
            "users": { "$all": [firstId, secondId] }
          })
          .sort({ updatedAt: 1 })
          .select(['_id', 'message', 'users'])
        return res.json({
          statue: true,
          firstId: firstId,
          secondId: secondId,
          message: messages,
        })
      }
      else {
        errorMsg = 'Cannot not find two userIds in request URL.'
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
  getMessages,
}