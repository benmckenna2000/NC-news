const { fetchArticle, fetchArticles, fetchUpdatedArticle, postComments, fetchCommentsByArticleId, deleteArticle } = require("../models/articles-models");

const sendArticle = (req, res, next) => {
    const {articleId} = req.params
    fetchArticle(articleId).then((article) =>
      res.send({article}).status(200)
    );
  };

  const sendUpdatedArticle = (req, res, next) => {
    const {inc_votes} = req.body;
    const {articleId} = req.params;

    fetchUpdatedArticle(articleId, inc_votes).then((article) => {
      res.send({article}).status(200)
    });
  };

  const sendCommentByArticle = (req, res, next) => {
    const newComment = req.body
    const articleId = req.params;
  postComments(newComment, articleId).then((comment) => {
    res.send(comment).status(200)
  })
}

  const sendArticles = (req, res, next) => {
    const { sort_by, order, author, topic } = req.query
    fetchArticles(sort_by, order, author, topic).then((articles) => {
      res.send({articles}).status(200)
    })
  }

  const sendCommentsByArticle = (req, res, next) => {
    const {sort_by, order} = req.query
    const articleId = req.params
    fetchCommentsByArticleId(sort_by, order, articleId).then((comments) => {
      res.send({comments}).status(200)
    })
  }

  const deleteArticleById = (req, res, next) => {
    const {articleId} = req.params
    deleteArticle(articleId).then(() => {
      res.sendStatus(204)
    })
  }

  module.exports = {sendArticle, sendUpdatedArticle, sendCommentByArticle, sendArticles, sendCommentsByArticle, deleteArticleById}