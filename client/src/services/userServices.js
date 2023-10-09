import axios from 'axios'

const BASE_URL = '/api/users'
const LOCAL_KEY_USER = 'user'

const getLocalUserData = () => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY_USER))
}

const setLocalUserData = (userData) => {
  localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(userData))
  return userData
}

const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(BASE_URL + '/register', { username, email, password })
    if (data.status) {
      setLocalUserData(data.message)
      return data.message
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

const login = async ({ username, password, checkbox }) => {
  try {
    const { data } = await axios.post(BASE_URL + '/login', { username, password })
    if (data.status) {
      const saveToLocal = checkbox ? { ...data.message, password } : data.message
      setLocalUserData(saveToLocal)
      return data.message
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

const setAvatar = async ({ _id, avatar }) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/setAvatar/${_id}`, { avatar })
    if (data.status) {
      const userData = getLocalUserData()
      const newUserData = { ...userData, avatar: data.message }
      setLocalUserData(newUserData)
      return newUserData
    }
    else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

const getAllUsersExceptMe = async (_id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getAllExceptMe/${_id}`)
    if (data.status) {
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

const userServices = {
  register,
  login,
  setAvatar,
  getLocalUserData,
  setLocalUserData,
  getAllUsersExceptMe,
}

export default userServices




