const express = require('express')
const{
    sendUser
} = require('../controllers/users-controller')

const usersRouter = express.Router()

usersRouter.route('/:username').get(sendUser)


module.exports = usersRouter