const express = require('express')
const{
    sendArticle,
    sendUpdatedArticle,
    sendCommentByArticle,
    sendArticles,
    sendCommentsByArticle,
    deleteArticleById
} = require('../controllers/articles-controller')

const articlesRouter = express.Router()

articlesRouter.route('/').get(sendArticles)

articlesRouter.route('/:articleId').get(sendArticle).patch(sendUpdatedArticle).delete(deleteArticleById)
articlesRouter.route('/:articleId/comments').post(sendCommentByArticle).get(sendCommentsByArticle)


module.exports = articlesRouter