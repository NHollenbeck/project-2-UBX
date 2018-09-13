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
      res.render("profileCreatePage", {});
    });
  });

  app.get("/profile/:id", function(req, res) {
    db.User.findOne({ where: { id: +req.params.id } }).then(function(dbUser) {
      console.log(dbUser);
      console.log(dbUser.imgurl);

      res.render("view-profile", {
        msg: "User Info!",
        dbUser: dbUser
      });
    });
  });

  // send to FE, in HB "data.msg"

  app.get("/events/create", function(req, res) {
    res.render("create-event");
  });

  app.post("/events/create", function(req, res) {
    console.log(req.body);
    //req.body needs to match up with schema in DB
    // db.Examples.create(req.body).then(function(dbExample) {
    //   //dbExample not needed as parameter above since we aren't using it, doesn't harm to have
    //   /* res.json(dbExample); */
    //   res.redirect("/events/all");
    //   // format to look more like sql query
    // });
    /*    var postData = req.body
   res.json(postData); */
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
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExamples
    ) {
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
