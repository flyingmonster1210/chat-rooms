const { login, register, setAvatar } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.route('/login/').post(login)
router.route('/register/').post(register)
router.route('/setAvatar/:id').put(setAvatar)

module.exports = router
