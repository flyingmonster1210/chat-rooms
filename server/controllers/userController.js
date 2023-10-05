const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const register = async (req, res, next) => {
  try {
    const body = req.body

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(body.password, salt)

    let message = 'Missing required field(s).'
    if (body && body.username && body.password && body.email) {
      if (!await User.findOne({ username: body.username })) {
        if (!await User.findOne({ email: body.email })) {
          const { username, email, avatar, _id } = await User.create({
            ...body,
            password: hashPassword,
          })
          return res.json({
            status: true,
            message: {
              username,
              email,
              avatar,
              _id,
            }
          })
        } else {
          message = 'This email address has been used.'
        }
      } else {
        message = 'This username has been used.'
      }
    }

    return res.json({
      status: false,
      message: message,
    })
  } catch (error) {
    console.error(error.message)
    next(error.message)
  }
}

const login = async (req, res, next) => {
  try {
    const body = req.body

    let message = 'Missing required field(s).'
    if (body && body.username && body.password) {
      const user = await User.findOne({ username: body.username })
      if (user) {
        if (await bcrypt.compare(body.password, user.password)) {
          delete user.password
          return res.json({
            status: true,
            message: {
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              _id: user._id,
            },
          })
        } else {
          message = 'Password is incorrect.'
        }
      } else {
        message = 'Username not found.'
      }
    }

    return res.json({
      status: false,
      message: message,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const setAvatar = async (req, res, next) => {
  try {
    const body = req.body
    const params = req.params

    let message = 'Missing required field(s).'
    if (body.avatar && params.id) {
      const { avatar } = await User.findByIdAndUpdate(params.id, { avatar: body.avatar })
      if (avatar) {
        return res.json({
          status: true,
          message: avatar,
        })
      } else {
        message = 'No new avatar returned from mongoDB.'
      }
    } else {
      message = `User in mongoDB with _id:${params.id} not found.`
    }

    return res.json({
      status: false,
      message: message,
    })
  } catch (error) {
    console.error(error.message)
    next(error)
  }
}


module.exports = {
  login,
  register,
  setAvatar,
}

