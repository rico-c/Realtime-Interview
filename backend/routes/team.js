const express = require("express");
const teamController = require("../controllers/team");
const router = express.Router();

router.get("/getteaminfo", teamController.getteaminfo);

module.exports = router;