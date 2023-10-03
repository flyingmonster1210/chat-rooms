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
          const newUser = User.create({
            ...body,
            password: hashPassword,
          })
          delete newUser.password
          res.json({
            status: true,
            message: newUser
          })
        } else {
          message = 'This email address has been used.'
        }
      } else {
        message = 'This username has been used.'
      }
    }

    res.json({
      status: false,
      message: message,
    })
  } catch (error) {
    console.error(error)
    next(error)
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
          res.json({
            status: true,
            message: {
              username: user.username,
              email: user.email,
            },
          })
        } else {
          message = 'Password is incorrect.'
        }
      } else {
        message = 'Username not found.'
      }
    }

    res.json({
      status: false,
      message: message,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}


module.exports = {
  login,
  register,
}

