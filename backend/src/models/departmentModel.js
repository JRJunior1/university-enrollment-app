const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Department = sequelize.define(
  "Department",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

module.exports = Department;
