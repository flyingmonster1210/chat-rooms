const express = require('express')
const { addMessage } = require('../controllers/messageController')
const router = express.Router()

router.route('/add').post(addMessage)

module.exports = router