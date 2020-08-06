const express = require('express')
const{
    sendArticle,
    // sendArticles,
    sendUpdatedArticle,
} = require('../controllers/articles-controller')

const articlesRouter = express.Router()

// articlesRouter.route('/').get(sendArticles)

articlesRouter.route('/:articleId').get(sendArticle).patch(sendUpdatedArticle)

// articlesRouter.route('/:articleId/comments').post()

module.exports = articlesRouter