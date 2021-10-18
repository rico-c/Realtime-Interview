const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opinionSchema = new Schema({
    userId: String,
    opinion: String,
    time: Date
});

const Opinion = mongoose.model("opinions", opinionSchema);

module.exports = Opinion;