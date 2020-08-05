const express = require("express");

const topicsRouter = require("./topicRouter");

const apiRouter = express.Router();

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;

