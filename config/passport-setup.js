const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
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
            imgurl: profile.photos[0].value
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

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.appID,
      clientSecret: keys.facebook.appSecret,
      callbackURL: "/auth/facebook/redirect",
      profileFields: ["id", "emails", "displayName", "name", "gender", "photos"]
    },
    function(accessToken, refreshToken, profile, done) {
      profile = profile._json;
      db.user
        .findOrCreate({
          where: { password: profile.id },
          defaults: {
            username: profile.name,
            password: profile.id,
            fullname: profile.name,
            firstname: profile.first_name,
            lastname: profile.last_name,
            imgurl: profile.picture.data.url
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
