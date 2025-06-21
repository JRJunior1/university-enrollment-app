const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const Grade = require("../models/gradeModel");

// Helper function to validate grade
function isValidGrade(grade) {
  return /^[A-FX]$/i.test(grade);
}

// Assign or update grades by index number
exports.assignGradesByIndexNumber = async (req, res) => {
  const { index_number, grades } = req.body; // grades: [{ course_id, grade }, ...]
  try {
    const student = await Student.findOne({ where: { index_number } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    for (const { course_id, grade } of grades) {
      // Validate grade
      if (!isValidGrade(grade)) {
        return res.status(400).json({
          message: "Invalid grade. Only letters A-F or X are allowed.",
        });
      }
      const upperGrade = grade.toUpperCase();
      // Check if a grade already exists for this student and course
      const [gradeRecord, created] = await Grade.findOrCreate({
        where: { student_id: student.id, course_id },
        defaults: { grade: upperGrade },
      });
      if (!created) {
        // If it exists, update the grade
        gradeRecord.grade = upperGrade;
        await gradeRecord.save();
      }
    }
    res.json({ message: "Grades updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get courses by student index number (trace to department)
exports.getCoursesByIndexNumber = async (req, res) => {
  try {
    const { index_number } = req.params;
    const student = await Student.findOne({ where: { index_number } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const courses = await Course.findAll({
      where: { department_id: student.department_id },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
