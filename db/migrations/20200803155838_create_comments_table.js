
exports.up = function(knex) {
  return knex.schema.createTable('comments', (commentTable) => {
      commentTable.increments('comment_id')
      commentTable.string('author').references('users.username')
      commentTable.integer('article_id').references('articles.article_id')
      commentTable.integer('votes').defaultTo(0)
      commentTable.date('created_at')
      commentTable.text('body')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
