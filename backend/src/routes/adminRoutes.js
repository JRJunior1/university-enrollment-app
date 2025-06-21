const express = require("express");
const router = express.Router();
const { assignGradesByIndexNumber } = require("../controllers/adminController");
const {
  getCoursesAndGradesForAdmin,
} = require("../controllers/studentController");

// POST /api/admin/assign-grades
router.post("/assign-grades", assignGradesByIndexNumber);

// GET /api/admin/courses-grades/:index_number
router.get("/courses-grades/:index_number", getCoursesAndGradesForAdmin);

module.exports = router;
