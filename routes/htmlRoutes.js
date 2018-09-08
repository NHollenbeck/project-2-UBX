var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      //hb file "index"
      res.render("index", {
        //data: displayIndex
        //dbExamples is the data from mySql
      });
    });
  });

  app.get("/profile/create", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("profileCreatePage", {
        /*  msg: "Welcome!",
        examples: dbExamples */
      });
    });
  });

  // For example below and event by ID, we either want to refer to specific table (user vs event) or have specific columns (ie userID vs eventID)
  app.get("/profile", function(req, res) {
    console.log(`Profile User: ${req.user}`);
    res.render("profile");
  });
  // send to FE, in HB "data.msg"

  app.get("/events/create", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("eventCreatePage", {
        /* msg: "Lets create a study group!",
        examples: dbExamples */
      });
    });
  });

  app.get("/events/all", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("eventListPage", {
        msg: "Here's some events matching your criteria!",
        events: dbEvents
      });
    });
  });

  // Join to pull all events for 1 user,
  // join to show all users for a given event

  app.get("/events/:id", function(req, res) {
<<<<<<< HEAD
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExamples
    ) {
=======
    db.Example.findOne({where: { id: req.params.id}}).then(function(dbExamples) {
>>>>>>> added map
      res.render("view-event", {
        location: "San Francisco, CA"
      });
    });
  });

  // Load example page and pass in an example by id
  /* app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  }); */

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
