const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/authController");

router.post("/register", registerStudent);

const { loginStudent } = require("../controllers/authController");
router.post("/login", loginStudent);

module.exports = router;
