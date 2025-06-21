const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Voucher = sequelize.define(
  "Voucher",
  {
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("unused", "used"),
      defaultValue: "unused",
    },
  },
  {
    tableName: "vouchers",
    timestamps: false,
  }
);

module.exports = Voucher;
