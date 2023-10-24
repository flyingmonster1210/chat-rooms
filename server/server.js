const express = require('express')
const app = express()
const socket = require('socket.io')
const connectDB = require('./db')
const colors = require('colors')
const requestInfo = require('./middlewares/normal')
const dotenv = require('dotenv').config()

const port = process.env.PORT

const server = app.listen(port, () => {
  console.log('\n\n-----------------------------------------------------------')
  console.log(`Server is listening on PORT:${port}`.green)
})

connectDB()

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
})

global.onlineUsers = new Map()
io.on('connection', (socket) => {
  console.log('connection')

  global.chatSocket = socket

  // Once the user login, put the userId into onlineUsers map
  socket.on('user-online', (userId) => {
    console.log('user login, userId = ', userId)
    console.log('socket.id: ', socket.id)
    onlineUsers.set(userId, socket.id)
  })

  // Once the user send a message, update the chat room if users are online
  // data = {from: userId, to: userId, message: msg}
  socket.on('send-message', (data) => {
    console.log('listening send-message')

    const recipient = onlineUsers.get(data.to)
    console.log('recipient: ', recipient)
    if (recipient) {
      console.log('user online')
      socket.to(recipient).emit('recieve-message', { sender: data.from, message: data.message })
    }
  })

  socket.on('user-offline', (userId) => {
    console.log('user logout, userId = ', userId)
    onlineUsers.delete(userId)
  })
})

app.use(requestInfo)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routers/userRouter'))
app.use('/api/message', require('./routers/messageRouter'))





