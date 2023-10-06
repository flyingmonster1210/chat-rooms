const { login, register, setAvatar, getAllUsersExceptMe } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.route('/login/').post(login)
router.route('/register/').post(register)
router.route('/setAvatar/:id').put(setAvatar)
router.route('/getAllExceptMe/:id').get(getAllUsersExceptMe)

module.exports = router
