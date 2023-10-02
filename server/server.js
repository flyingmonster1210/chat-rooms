const express = require('express')
const app = express()
const connectDB = require('./db')
const colors = require('colors')
const requestInfo = require('./middlewares/normal')
const dotenv = require('dotenv').config()

const port = process.env.PORT

app.listen(port, () => {
  console.log('\n\n-----------------------------------------------------------')
  console.log(`Server is listening on PORT:${port}`.green)
})

connectDB()

app.use(requestInfo)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users/', require('./routers/userRouter'))





