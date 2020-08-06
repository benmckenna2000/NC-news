const { fetchArticle, fetchArticles, fetchUpdatedArticle } = require("../models/articles-models");

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
  
  

  // const sendUserComment = (req, res, next) => {

// const sendArticles = (req, res, next) => {
//   fetchArticles().then((articles) => {
//     res.send({articles}).status(200)
//   })
// }
  module.exports = {sendArticle, sendUpdatedArticle, sendUpdatedArticle,}