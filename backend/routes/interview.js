const express = require("express");
const interviewController = require("../controllers/interview");
const router = express.Router();

router.post("/create", interviewController.create);
router.get("/createroomid", interviewController.createRoom);
router.get("/delete", interviewController.delete);
router.get("/getinterviews", interviewController.getinterviews);
router.post("/updatenote", interviewController.updateNote);
router.get("/getinterview", interviewController.getInterview);
router.post("/endinterview", interviewController.endInterview);

module.exports = router;
 