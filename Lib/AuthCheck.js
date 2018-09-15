const authCheck = (req, res, next) => {
  !req.user ? res.redirect("/auth/login") : next();
};

module.exports = authCheck;
