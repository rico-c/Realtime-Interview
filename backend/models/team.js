const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    userIds: Array,
    team: String,
    teamId: Array,
    company: String,
    createTime: Date
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;