const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/users");
var db = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.user.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      const location = profile._json.placesLived
        ? profile._json.placesLived[0].value
        : null;
      // passport callback function
      db.user
        .findOrCreate({
          where: { password: profile.id },
          defaults: {
            username: profile.displayName,
            password: profile.id,
            fullname: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            imageurl: profile.photos[0].value
          }
        })
        .spread((user, created) => {
          console.log(user);
          const currentUser = user.get({
            plain: true
          });
          console.log(currentUser);
          done(null, currentUser);
        });
    }
  )
);
