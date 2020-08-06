const { fetchUpdatedComment, deleteComment } = require("../models/comments-models");

const sendUpdatedComment = (req, res, next) => {
    const {inc_votes} = req.body;
    const {commentId} = req.params;

    fetchUpdatedComment(commentId, inc_votes).then((comment) => {
      res.send({comment}).status(200)
    });
  };

  const deleteCommentById = (req, res, next) => {
    const {commentId} = req.params
    deleteComment(commentId).then(() => {
      res.sendStatus(204)
    })
  }
  module.exports = {sendUpdatedComment, deleteCommentById}