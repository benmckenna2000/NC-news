const { fetchTopics } = require("../models/topics-models");


exports.sendTopics = (req, res, next) => {
    fetchTopics().then((topics) =>
      res.status(200).send({ topics })
    );
  };