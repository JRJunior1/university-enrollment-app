const Student = require("../models/studentModel");
const Voucher = require("../models/voucherModel");
const Grade = require("../models/gradeModel");
const Course = require("../models/courseModel");
const Department = require("../models/departmentModel");

// Register a new student
exports.registerStudent = async (req, res) => {
  const { voucher_code, first_name, other_names, department_id } = req.body;

  // Generate a unique index number: "170" + 7 random digits
  function generateIndexNumber() {
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // ensures 7 digits
    return "170" + randomDigits;
  }

  try {
    // Check if voucher exists
    const voucher = await Voucher.findOne({ where: { code: voucher_code } });
    if (!voucher) {
      return res.status(400).json({ message: "Invalid voucher code." });
    }
    if (voucher.status === "used") {
      return res
        .status(409)
        .json({ message: "Voucher has already been used." });
    }

    // Generate a unique index number
    let index_number;
    let exists = true;
    while (exists) {
      index_number = generateIndexNumber();
      const existing = await Student.findOne({ where: { index_number } });
      if (!existing) exists = false;
    }

    // Create a new student
    const newStudent = await Student.create({
      first_name,
      other_names,
      voucher_code,
      department_id,
      index_number,
      password: "group16", // Default password
    });

    // Mark the voucher as used
    voucher.status = "used";
    await voucher.save();

    res.status(201).json({
      message: "Student registered successfully.",
      student: {
        full_name: `${newStudent.first_name} ${newStudent.other_names}`,
        index_number: newStudent.index_number,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering student.", error });
  }
};

// Get student data by index number
exports.getDashboardInfoByIndexNumber = async (req, res) => {
  try {
    const { index_number } = req.params;
    const student = await Student.findOne({ where: { index_number } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const department = await Department.findOne({
      where: { id: student.department_id },
    });
    const courses = await Course.findAll({
      where: { department_id: student.department_id },
    });
    const grades = await Grade.findAll({ where: { student_id: student.id } });

    const coursesWithGrades = courses.map((course) => {
      const gradeObj = grades.find((g) => g.course_id === course.id);
      return {
        courseName: course.name,
        grade: gradeObj ? gradeObj.grade : "X",
      };
    });

    res.json({
      index_number: student.index_number,
      full_name: `${student.first_name} ${student.other_names}`,
      department: department ? department.name : "",
      courses: coursesWithGrades,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- PREFILL FEATURE FOR ADMIN GRADE ENTRY ---
/**
 * Get all courses for a student's department, with current grades (if any)
 * Use this endpoint in your admin panel to pre-fill grade inputs.
 */
exports.getCoursesAndGradesForAdmin = async (req, res) => {
  try {
    const { index_number } = req.params;
    const student = await Student.findOne({ where: { index_number } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const courses = await Course.findAll({
      where: { department_id: student.department_id },
    });
    const grades = await Grade.findAll({ where: { student_id: student.id } });

    // Pre-fill: return course id, name, and grade (if any)
    const coursesWithGrades = courses.map((course) => {
      const gradeObj = grades.find((g) => g.course_id === course.id);
      return {
        course_id: course.id,
        course_name: course.name,
        grade: gradeObj ? gradeObj.grade : "",
      };
    });

    res.json(coursesWithGrades);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
