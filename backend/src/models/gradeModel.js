const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Grade = sequelize.define(
  "Grade",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(2),
    },
  },
  {
    tableName: "grades",
    timestamps: false,
  }
);

module.exports = Grade;
