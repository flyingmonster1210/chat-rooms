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


const messageServices = {
  addMessage,
}

export default messageServices

