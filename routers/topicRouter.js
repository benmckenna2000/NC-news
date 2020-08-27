const express = require('express')
const{
    sendTopics,
    sendNewTopic
} = require('../controllers/topics-controller');


const topicsRouter = express.Router();


topicsRouter.route('/').get(sendTopics).post(sendNewTopic)











module.exports = topicsRouter