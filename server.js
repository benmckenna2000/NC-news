const express = require("express");
const apiRouter = require("./routers/apiRouter");
const cors = require("cors");

app.use(cors());

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "23503") {
    res.status(404).send({ msg: "Username not found!" });
  }
});

module.exports = app;
