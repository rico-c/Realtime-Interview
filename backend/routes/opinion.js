const express = require("express");
const opinionController = require("../controllers/opinion");
const router = express.Router();

router.post("/create", opinionController.create);

module.exports = router;