const express = require("express");
const writtenexamController = require("../controllers/writtenexam");
const router = express.Router();

router.get("/getwrittenexams", writtenexamController.getwrittenexams);

module.exports = router;