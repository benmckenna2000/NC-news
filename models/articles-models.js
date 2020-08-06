const connection = require('../db/connection')

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
   
}

exports.fetchUpdatedArticle = (inc_votes, articleId) => {
  return connection
  .from("articles")
  .where('article_id', '=', articleId)
  .increment('votes', inc_votes)
  .returning('*')
  .then((article) => {
    return article[0]
  })
};

// exports.fetchUserComment = () => {

// }

// exports.fetchArticles = () => {
//   return connection
//   .select(
//       "articles.author",
//       "articles.title",
//       "articles.article_id",
//       "articles.body",
//       "articles.topic",
//       "articles.created_at",
//       "articles.votes"
//     )
//     .from("articles")
//     .increment(votes: inc_votes)
//     .count("comments.article_id as comment_count")
//     .leftJoin("comments", "comments.article_id", "articles.article_id")
//     .groupBy("articles.article_id")
//     .then((articles) => {
//     return articles.map((article) => {
//       console.log(article)
//     });
//   });
 
// }