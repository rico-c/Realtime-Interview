const express = require("express");
const userController = require('../controllers/user');
const router = express.Router();

router.get("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;