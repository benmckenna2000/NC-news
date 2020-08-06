const express = require('express')
const{
    sendAllUsers,
    sendUser
} = require('../controllers/users-controller')

const usersRouter = express.Router()
usersRouter.route('/').get(sendAllUsers)
usersRouter.route('/:username').get(sendUser)


module.exports = usersRouter