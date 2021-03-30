const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // username: String,
    password: String,
    mobile: Number,
    // 中文名字，在面试中现实
    name: String,
    userId: String,
    /**
     * teamName: string,
     * teamId: string
     */
    belongTeams: Array,
    company: String,
    companyId: String,
    createTime: Date
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;