const Student = require("../models/studentModel");
const Voucher = require("../models/voucherModel");

exports.registerStudent = async (req, res) => {
  try {
    const { voucher_code, first_name, other_names, department_id } = req.body;

    // Check if voucher exists
    const voucher = await Voucher.findOne({ where: { code: voucher_code } });
    if (!voucher) {
      return res.status(400).json({ message: "Invalid voucher code." });
    }
    // Check if voucher is already used
    if (voucher.status === "used") {
      return res
        .status(409)
        .json({ message: "Voucher has already been used." });
    }
    function generateIndexNumber() {
      const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // ensures 7 digits
      return "170" + randomDigits;
    }
    // Generate unique index number (simple example)
    let index_number;
    let exists = true;
    while (exists) {
      index_number = generateIndexNumber();
      const existing = await Student.findOne({ where: { index_number } });
      if (!existing) exists = false;
    }

    // Register student
    const student = await Student.create({
      first_name,
      other_names,
      voucher_code,
      department_id,
      index_number,
      password: "group16",
    });

    // Mark voucher as used and save
    voucher.status = "used";
    await voucher.save();

    res.status(201).json({
      message: "Registration successful",
      student: {
        full_name: `${student.first_name} ${student.other_names}`,
        index_number: student.index_number,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginStudent = async (req, res) => {
  const { index_number, password } = req.body;
  try {
    const student = await Student.findOne({ where: { index_number } });
    if (!student || student.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    res.json({
      success: true,
      student: {
        index_number: student.index_number,
        full_name: student.first_name + " " + student.other_names,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
