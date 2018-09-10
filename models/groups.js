module.exports = function (sequelize, DataTypes) {
  var studyGroup = sequelize.define("studyGroup", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    category: DataTypes.STRING,
    loaction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });
  return studyGroup;
};
