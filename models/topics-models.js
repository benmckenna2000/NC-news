const connection = require('../db/connection')
const app = require('../server')

exports.fetchTopics = () => {
    return connection
    .select("*")
    .from('topics')
    .returning("*")
    .then((topics) => {
      return topics;
    });
   
}