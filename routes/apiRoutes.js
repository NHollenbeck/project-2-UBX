var users = require("../models/study.js");
var studyGroup = require("../models/study.js")

module.exports = function (app) {
  // Create a new user
  app.post("/api/new-user", function (req, res) {
    users.create({
      username: req.body.username,
      password: req.body.password
    }).then(function (results) {
      res.json(results);
    });
  });

  // Get all study groups
  app.get("/api/groups", function (req, res) {
    studyGroup.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // Get study groups by category
  app.get("/api/groups/:category", function (req, res) {
    studyGroup.findAll({
      where: {
        category: req.params.category
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // Get study group by title or id
  app.get("/api/groups/:title", function (req, res) {
    studyGroup.findOne({
      where: {
        title: req.params.title,
        // id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // Create a new study group
  app.post("/api/new-group", function (req, res) {
    studyGroup.create({
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(function (results) {
      res.json(results);
    });
  });

  // Delete a study group by title or id
  app.delete("/api/groups/:title", function (req, res) {
    studyGroup.destroy({
      where: {
        title: req.params.title,
        // id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });
};
