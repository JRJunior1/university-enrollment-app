const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Course = sequelize.define(
  "Course",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "courses",
    timestamps: false,
  }
);

module.exports = Course;
