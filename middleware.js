const req = require("express/lib/request");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //.isAuthenticated is a passport method which checks if they're logged in
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};
