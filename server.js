const express = require("express");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());
app.use("/api", apiRouter);
app.use((err, req, res, next) => {
    console.log(err)
    res.sendStatus(500)
})
module.exports = app