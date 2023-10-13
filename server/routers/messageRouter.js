const express = require('express')
const { addMessage, getMessages } = require('../controllers/messageController')
const router = express.Router()

router.route('/add').post(addMessage)
router.route('/get/:firstId/:secondId').get(getMessages)

module.exports = router