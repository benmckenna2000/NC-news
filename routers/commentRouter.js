const express = require('express')
const commentsRouter = express.Router()

commentsRouter.route('/:commentId').delete(deleteCommentById)

module.exports = commentsRouter