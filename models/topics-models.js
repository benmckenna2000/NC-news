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

exports.postTopic = (newTopic) => {
  return connection
  .insert({ slug: newTopic.slug, description: newTopic.description })
  .into("topics")
  .returning("*")
  .then((topic) => {
    return topic[0]
  })
}