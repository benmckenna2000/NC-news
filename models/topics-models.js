const knex = require('../db/connection')

exports.fetchTopics = () => {
    return knex
    .select('slug', 'description')
    .from('topics').then((topics) => {
        return {topics}
        })
   
}