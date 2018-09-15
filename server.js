require("dotenv").config();
require("./config/passport-setup");
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-routes");
const htmlRoutes = require("./routes/htmlRoutes");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

// Passport Init & Session
app.use(
  cookieSession({
    maxAge: 3060 * 1000,
    keys: [keys.session.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
app.use(htmlRoutes);
app.use("/auth", authRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
