const express = require("express");

const topicsRouter = require("./topicRouter");
const usersRouter = require('./userRouter')
const apiRouter = express.Router();

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter)
module.exports = apiRouter;

