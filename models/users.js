var Sequelize = require("sequelize");
var sequelize = require("../config/config.json");

var users = sequelize.define("users", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    imgurl: Sequelize.STRING
});


users.sync();

module.exports = users;