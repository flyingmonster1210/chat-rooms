const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const URL = process.env.MONGODB_URL
    const connection = await mongoose.connect(URL)
    console.log(`Successfully connect to ${connection.connection.host}`.cyan.underline)
    return connection
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB


