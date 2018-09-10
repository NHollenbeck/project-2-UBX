const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log(`User from the google redirect route: ${req.user}`);
  res.redirect("/profile");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    console.log(`User from the facebook route: ${JSON.stringify(req.user)}`);
    res.redirect("/profile");
  }
);

module.exports = router;
