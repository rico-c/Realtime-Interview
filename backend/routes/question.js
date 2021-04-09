const express = require("express");
const questionController = require("../controllers/question");
const router = express.Router();

router.post("/create", questionController.create);
router.get("/getbyteam", questionController.getbyteam);

module.exports = router;