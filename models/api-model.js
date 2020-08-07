const fs = require("fs");
const rawJsonObject = fs.readFile("./endpoints", "utf8", ((err, data) => {
  console.log(data)
}))


exports.getJson = () => {
  return JSON.parse(rawJsonObject);
};
