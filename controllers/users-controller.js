const { fetchUser } = require("../models/users-models");

const sendUser = (req, res, next) => {
    const {username} = req.params
    fetchUser(username).then((user) =>
    res.send({user}).status(200) 
    );
  };

  module.exports = {sendUser}