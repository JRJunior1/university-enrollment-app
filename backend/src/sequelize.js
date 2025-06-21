const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("university_enrollment", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
