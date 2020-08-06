const express = require("express");
const articlesRouter = require ('./articleRouter')
const topicsRouter = require("./topicRouter");
const usersRouter = require('./userRouter')
const commentsRouter = require('./commentRouter')
const apiRouter = express.Router();

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
module.exports = apiRouter;

