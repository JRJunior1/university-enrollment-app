const express = require("express");
const router = express.Router();
const {
  getDashboardInfoByIndexNumber,
} = require("../controllers/studentController");

router.get("/dashboard/:index_number", getDashboardInfoByIndexNumber);

module.exports = router;
