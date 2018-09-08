module.exports = function(sequelize, DataTypes) {
  var studyGroup = sequelize.define("studyGroup", {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    loaction: DataTypes.STRING,
    time: DataTypes.DATE,
    host: DataTypes.STRING
  });
  return studyGroup;
};
