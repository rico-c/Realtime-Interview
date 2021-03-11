const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    language: Number,
    title: String,
    content: String,
    difficulty: Number,
    // 1: 算法题 2.语言基础题
    type: Number
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;