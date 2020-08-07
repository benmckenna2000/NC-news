const { getJson } = require("../models/api-model");

const sendJson = (req, res, next) => {
  let body = getJson();
  res.status(200).json({ body });
};

module.exports = sendJson