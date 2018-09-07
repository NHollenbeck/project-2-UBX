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
    /* var data= {
      note: "You connected to the server",

    }; */
    res.json(data);
  });

  // Create a new event
  app.post("/api/events/create", function(req, res) {
    //req.body needs to match up with schema in DB
    db.Examples.create(req.body).then(function(dbExample) {
      //dbExample not needed as parameter above since we aren't using it, doesn't harm to have
      /* res.json(dbExample); */
      res.redirect("/events/all");
      // format to look more like sql query
    });
/*    var postData = req.body
   res.json(postData); */
  
  });
// create new
  app.post("/api/profile/create", function(req, res) {
    //req.body needs to match up with schema in DB
    db.Examples.create(req.body).then(function(dbExample) {
      //dbExample not needed as parameter above since we aren't using it
      /* res.json(dbExample); */
      res.redirect("/events/all");
      // format to look more like sql query
    });
/*    var postData = req.body
   res.json(postData); */
  
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
  // delete event by id
    })
  })
  app.delete("/api/events/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};


 /*  // Delete an profile by id
  app.delete("/api/profile/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  }); */

