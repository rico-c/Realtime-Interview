const express = require("express");
const interviewController = require("../controllers/interview");
const router = express.Router();

router.post("/create", interviewController.create);
router.get("/createroomid", interviewController.createRoom);
router.get("/get", interviewController.get);

module.exports = router;
 