const express = require('express')
const app = express()
const socket = require('socket.io')
const connectDB = require('./db')
const colors = require('colors')
const requestInfo = require('./middlewares/normal')
const dotenv = require('dotenv').config()
const path = require('path')

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
  global.chatSocket = socket

  // Once the user login, put the userId into onlineUsers map
  socket.on('user-online', (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  // Once the user send a message, update the chat room if users are online
  // data = {from: userId, to: userId, message: msg}
  socket.on('send-message', (data) => {

    const recipient = onlineUsers.get(data.to)
    if (recipient) {
      socket.to(recipient).emit('recieve-message', { sender: data.from, message: data.message })
    }
  })

  socket.on('user-offline', (userId) => {
    onlineUsers.delete(userId)
  })
})

app.use(requestInfo)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routers/userRouter'))
app.use('/api/message', require('./routers/messageRouter'))

if (process.env.ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
}
else {
  app.get('/', (req, res) => res.send('Please go to the production mode.'))
}



