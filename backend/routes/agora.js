const express = require("express");
const agoraController = require("../controllers/agora");
const router = express.Router();

router.get("/gettoken", agoraController.gettoken);

module.exports = router;
