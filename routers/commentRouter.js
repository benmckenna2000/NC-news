const express = require('express')
const {
    sendUpdatedComment,
    deleteCommentById
} = require('../controllers/comments-controller')
const commentsRouter = express.Router()

commentsRouter.route('/:commentId').patch(sendUpdatedComment).delete(deleteCommentById)


module.exports = commentsRouter