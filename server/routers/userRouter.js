const { login, register } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.route('/login/').post(login)
router.route('/register/').post(register)

module.exports = router
