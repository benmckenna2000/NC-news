const express = require('express')
const{
    sendUser
} = require('../controllers/users-controller')

const usersRouter = express.Router()

usersRouter.use('/:username').get(sendUser)


module.exports = usersRouter