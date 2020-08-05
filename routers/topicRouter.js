const express = require('express')
const{
    sendTopics
} = require('../controllers/topics-controller')

const topicsRouter = express.Router();


topicsRouter.route('/').get(sendTopics)











module.exports = topicsRouter