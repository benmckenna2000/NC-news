const connection = require("../db/connection");

exports.fetchArticle = (articleId) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .where("articles.article_id", articleId)
    .count("comments.article_id as comment_count")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .then((article) => {
      return article[0];
    });
};

exports.fetchUpdatedArticle = (articleId, inc_votes) => {
  return connection
    .from("articles")
    .where("article_id", "=", articleId)
    .increment("votes", inc_votes)
    .returning("*")
    .then((article) => {
      return article[0];
    });
};

exports.postComments = (newComment, articleId) => {
  return connection
    .insert({ body: newComment.body, author: newComment.username, article_id: articleId })
    .into("comments")
    .returning("*")
    .then((comment) => {
      console.log(comment[0]);
      return comment;
    });
};

exports.fetchArticles = (sort_by = 'created_at', order = 'desc', author, topic) => {
  let dbQuery;
  if (author) {
    dbQuery = connection
      .select(
        "articles.*"
      )
      .from("articles")
      .count("comments.comment_id as comment_count")
      .groupBy("articles.article_id")
      .leftJoin("comments", "comments.article_id", "articles.article_id")
      .where("articles.author", "=", author)
      .orderBy(sort_by, order)
  }
  else if(topic) {
    dbQuery = connection
    .select(
     "articles.*"
    )
    .from("articles")
    .count("comments.comment_id as comment_count")
    .groupBy("articles.article_id")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .where("articles.topic", "=", topic)
    .orderBy(sort_by, order)
  }
  else {
    dbQuery = connection
    .select(
      "articles.*"
    )
    .from("articles")
    .count("comments.comment_id as comment_count")
    .groupBy("articles.article_id")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .orderBy(sort_by, order)
  }
  return dbQuery.then((articles) => {
    return articles;
})
}

exports.fetchCommentsByArticleId = (sort_by = 'created_at', order = 'desc', articleId) => {
  return connection
  .select("comments.*")
  .from('comments')
  .where("articles.article_id", "=", articleId)
  .orderBy(sort_by, order)
  .then((comments) => {
    return comments
  })
  
}

exports.deleteArticle = (articleId) => {
  return connection
  .select(
  "articles.*"
  )
  .from("articles")
  .where("articles.article_id", articleId)
  .count("comments.article_id as comment_count")
  .leftJoin("comments", "comments.article_id", "articles.article_id")
  .del()
}