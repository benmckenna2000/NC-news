const { fetchTopics, postTopic } = require("../models/topics-models");

const sendTopics = (req, res, next) => {
    fetchTopics().then((topics) =>
    res.send({topics}).status(200)
      
    );
  };

const sendNewTopic = (req, res, next) => {
  const newTopic = req.body
  postTopic(newTopic).then((topic) => {
    res.send({topic}).status(200)
  })
}
  module.exports= {sendTopics, sendNewTopic}