var Sequelize = require("sequelize");
var sequelize = require("../config/config.json");

var studyGroup = sequelize.define("studyGroup", {
    title: Sequelize.STRING,
    body: Sequelize.STRING,
    category: Sequelize.STRING,
    loaction: Sequelize.STRING,
    time: Sequelize.DATE,
    host: Sequelize.STRING

});


studyGroup.sync();

module.exports = studyGroup;