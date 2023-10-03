import axios from 'axios'

const BASE_URL = '/api/users'
const LOCAL_KEY_USER = 'user'

const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(BASE_URL + '/register', { username, email, password })
    if (data.status) {
      localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(data.message))
      return data.message
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message || error)
    throw new Error(error.message || error)
  }
}

const localUserData = () => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY_USER))
}

const login = async ({ username, password, checkbox }) => {
  try {
    const { data } = await axios.post(BASE_URL + '/login', { username, password })
    if (data.status) {
      const saveToLocal = checkbox ? { ...data.message, password } : data.message
      localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(saveToLocal))
      return data.message
    } else {
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
  localUserData
}

export default userServices




