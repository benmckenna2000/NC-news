const { fetchTopics } = require("../models/topics-models");

const sendTopics = (req, res, next) => {
    fetchTopics().then((topics) =>
    res.send({topics}).status(200)
      
    );
  };

  module.exports= {sendTopics}