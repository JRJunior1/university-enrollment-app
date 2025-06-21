const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Student = sequelize.define(
  "Student",
  {
    first_name: DataTypes.STRING,
    other_names: DataTypes.STRING,
    voucher_code: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    index_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "group16",
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
