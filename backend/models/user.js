const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    mobile: Number,
    name: String,
    userId: String,
    team: String,
    teamId: Array,
    company: String,
    createTime: Date
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;