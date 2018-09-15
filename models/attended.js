module.exports = function(sequelize, DataTypes) {
  var attended = sequelize.define("attended_events", {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return attended;
};
