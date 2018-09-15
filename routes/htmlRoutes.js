const router = require("express").Router();
var db = require("../models");

// CHANGE below (removing db functionality, just rendering)
router.get("/", function(req, res) {
  res.render("index");
});

router.get("/profile", function(req, res) {
  console.log(`Profile User: ${JSON.stringify(req.user)}`);
  let eventsAttending = [];
  let eventIDList = [];
  let eventsHosting = [];

  db.studyGroup
    .findAll({
      where: {
        host: req.user.password
      }
    })
    .then(resp => {
      eventsHosting = resp;
      db.attended_events
        .findAll({
          where: {
            userID: req.user.password
          },
          attributes: ["eventID"]
        })
        .then(attendances => {
          attendances.map(x => {
            eventIDList.push(x.dataValues.eventID);
          });
          console.log(eventIDList);
          db.studyGroup
            .findAll({
              where: {
                id: eventIDList
              }
            })
            .then(resp => {
              eventsAttending = resp;
              res.render("profile", {
                createdAt: req.user.createdAt,
                imgurl: req.user.imgurl,
                username: req.user.username,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                eventsHosting: eventsHosting,
                eventsAttending: eventsAttending
              });
            });
        });
    });
});

// send to FE, in HB "data.msg"

router.get("/events/create", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.render("eventCreatePage", {
      /* msg: "Lets create a study group!",
        examples: dbExamples */
    });
  });
});

router.get("/events", function(req, res) {
  db.studyGroup.findAll({}).then(events => {
    res.render("list-events", {
      events: events
    });
  });
});

router.get("/events/event", (req, res) => {
  if (!req.params.id) {
    res.redirect("/events");
  }
  console.log(req.query.id);
  res.render("view-event");
});

module.exports = router;
