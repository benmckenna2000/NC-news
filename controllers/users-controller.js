const { fetchUser, fetchAllUsers } = require("../models/users-models");

const sendUser = (req, res, next) => {
    const {username} = req.params
    fetchUser(username).then((user) =>
    res.send({user}).status(200) 
    );
  };

  const sendAllUsers = (req, res, next) => {
    fetchAllUsers().then((users) => {
      res.send({users}).status(200)
    })
  }
  module.exports = {sendUser, sendAllUsers}