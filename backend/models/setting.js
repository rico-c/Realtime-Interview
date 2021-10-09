const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    userId: String,
    defaultLanguage: Number,
    tab: Number,
    // 使用snippets
    defaultSnippets: Boolean,
    // 切屏提示
    cutTabWarning: Boolean
});

const Users = mongoose.model("settings", settingSchema);

module.exports = Settings;