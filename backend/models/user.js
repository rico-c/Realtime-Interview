const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  userid: String,
  team: String,
  teamid: String,
  company: String,
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
