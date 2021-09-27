const express = require("express");
const teamController = require("../controllers/team");
const router = express.Router();

router.get("/getteaminfo", teamController.getteaminfo);
router.post("/addmember", teamController.addmember);
router.post("/removemember", teamController.removemember);
router.post("/rename", teamController.rename);

module.exports = router;
