const connection = require("../db/connection");
const app = require("../server");

exports.fetchUser = (username) => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*")
    .then((user) => {
      return user[0];
    });
};

exports.fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .returning("*")
    .then((users) => {
      return users;
    });
};
