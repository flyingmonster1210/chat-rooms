import axios from 'axios'

const BASE_URL = '/api/message'

/*
 * @Desc:  Axios request to add a message
 * @Param: func(messageData: {message, users, senderId})
 */
const addMessage = async (messageData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/add`, messageData)
    if (data.statue) {
      return data.message
    }
    else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

/*
 * @Desc:  Get messages between users
 * @Param: func(userIds: [myId, otherId])
 */
const getMessages = async (userIds) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/get/${userIds[0]}/${userIds[1]}`)
    if (data.statue) {
      const messages = data.message.map((msg) => (
        {
          _id: msg._id,
          message: msg.message,
          sender: msg.users[0],
        }
      ))
      // console.log('messages: ', messages)

      return messages
    }
    else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

const messageServices = {
  addMessage,
  getMessages,
}

export default messageServices

