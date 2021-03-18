const express = require("express");
const userController = require('../controllers/user');
const router = express.Router();

router.get("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);

module.exports = router;