
exports.up = function(knex) {
 
  return knex.schema.createTable('articles', (articleTable) => {
      articleTable.increments('article_id')
      articleTable.string('title')
      articleTable.text('body')
      articleTable.integer('votes').defaultTo(0)
      articleTable.string('topic').references('topics.slug')
      articleTable.string('author').references('users.username')
      articleTable.date('created_at')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
