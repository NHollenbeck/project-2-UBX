module.exports = function(sequelize, DataTypes) {
  var attended = sequelize.define("attended_events", {
    userID: DataTypes.STRING,
    eventID: DataTypes.STRING
  });
  return attended;
};
