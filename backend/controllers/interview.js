const InterviewModel = require("../models/interview");
const dayjs = require('dayjs');
const {
    customAlphabet
} = require("nanoid");

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

class Interview {
    constructor() {
        this.create = this.create.bind(this);
    }

    // 创建房间ID
    async createRoom(req, res) {
        const creator = req.query.userId;
        let roomId = nanoid();
        let exsitId = await InterviewModel.findOne({
            roomId
        });
        if (exsitId) {
            roomId = nanoid();
            exsitId = await InterviewModel.findOne({
                roomId
            });
            if (exsitId) {
                res.send({
                    code: 1,
                    message: "创建唯一ID失败"
                });
            } else {
                await InterviewModel.create({
                    roomId,
                    creator
                });
            }
            res.send({
                code: 0,
                data: roomId
            });
        } else {
            await InterviewModel.create({
                roomId,
                creator,
                createTime: new Date()
            });
            res.send({
                code: 0,
                data: roomId
            });
        }
    }

    // 创建预约面试
    async create(req, res) {
        const params = req.body;
        const {
            roomId
        } = params;
        const exsitId = await InterviewModel.findOne({
            roomId
        });
        if (!exsitId) {
            res.send({
                code: 1,
                message: "未找到面试 ID，请稍后重试"
            });
        } else {
            await InterviewModel.update({roomId: roomId}, params, (err) => {
                if(err) {
                    return res.send({
                        code: 1,
                        message: err
                    });
                }
                res.send({
                    code: 0,
                    message: "创建成功"
                });
            })
        }
    }

    // 查询面试列表
    async get(req, res) {
        const params = req.query;
        const teamId = params.teamId;
        const list = await InterviewModel.where({
            teamId
        });
        res.send({
            code: 0,
            data: list
        });
    }
}

module.exports = new Interview();