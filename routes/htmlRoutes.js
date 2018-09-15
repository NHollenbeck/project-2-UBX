const router = require("express").Router();
const authCheck = require("../Lib/AuthCheck");
var db = require("../models");
const moment = require("moment");

// CHANGE below (removing db functionality, just rendering)
router.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Study Up!",
    activeUser: req.user
  });
});

router.get("/profile", authCheck, function(req, res) {
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
              console.log(eventsHosting);
              res.render("profile", {
                pageTitle: req.user.username + " | Study Up!",
                activeUser: req.user,
                createdAt: moment(req.user.createdAt).format("MMM YYYY"),
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

router.get("/events/create", authCheck, function(req, res) {
  res.render("create-event", {
    pageTitle: "Create An Event | Study Up!",
    activeUser: req.user
  });
});

router.post("/events/create", (req, res) => {
  console.log(req.body);
  db.studyGroup
    .create({
      title: req.body.eventTitle,
      body: req.body.eventBio,
      loaction: req.body.eventLocation,
      imgurl: req.body.eventImageUrl,
      time: req.body.eventTime,
      host: req.user.dataValues.password
    })
    .then(result => {
      console.log(result);
      res.redirect("/profile");
    });
});

router.get("/events", function(req, res) {
  db.studyGroup.findAll({}).then(events => {
    res.render("list-events", {
      pageTitle: "Events | Study Up!",
      activeUser: req.user,
      events: events
    });
  });
});

router.get("/events/event", (req, res) => {
  console.log(req.query.id);
  let eventInfo = {};
  let hostInfo = {};
  db.studyGroup.findById(req.query.id).then(currentEvent => {
    eventInfo = currentEvent.dataValues;
    db.user
      .findOne({
        where: {
          password: eventInfo.host
        }
      })
      .then(host => {
        hostInfo = host.dataValues;
        let cannotAttend = false;
        if (req.user) {
          cannotAttend = hostInfo.password === req.user.dataValues.password;
        }
        res.render("view-event", {
          pageTitle: eventInfo.title + " | Study Up!",
          activeUser: req.user,
          fullName: host.fullname,
          profileImg: host.imgurl,
          memberSince: moment(host.createdAt).format("MMM YYYY"),
          cannotAttend: cannotAttend,
          eventid: eventInfo.id,
          title: eventInfo.title,
          body: eventInfo.body,
          location: eventInfo.loaction,
          time: moment(eventInfo.time).format("dddd, MMMM Do YYYY, h:mm a"),
          imgurl: eventInfo.imgurl
        });
      });
  });
});

router.get("/events/attend", authCheck, (req, res) => {
  db.attended_events
    .findOrCreate({
      where: {
        userID: req.user.dataValues.password,
        eventID: req.query.id
      },
      defaults: {
        userID: req.user.dataValues.password,
        eventID: req.query.id
      }
    })
    .then(result => {
      console.log(result);
      res.redirect("/profile");
    });
});

module.exports = router;
