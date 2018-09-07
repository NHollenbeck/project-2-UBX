var Sequelize = require("sequelize");
var sequelize = require("../config/config.json");

var attended = sequelize.define("attended_events", {

});

attended.sync();

module.exports = attended;