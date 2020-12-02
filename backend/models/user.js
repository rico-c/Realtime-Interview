const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  id: Number
});

userSchema.index({ id: 1 });

const Users = mongoose.model("users", userSchema);

module.exports = Users;
