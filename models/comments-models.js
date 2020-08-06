const connection = require("../db/connection");

exports.fetchUpdatedComment = (commentId, inc_votes) => {
  return connection
    .from("comments")
    .where("comment_id", "=", commentId)
    .increment("votes", inc_votes)
    .returning("*")
    .then((comment) => {
      return comment[0];
    });
};

exports.deleteComment = (commentId) => {
  return connection
    .from("comments")
    .where("comment_id", "=", commentId)
    .del()
};
