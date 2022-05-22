const req = require("express/lib/request");

module.exports.isLoggedIn = (req, res, next) => {
  console.log("req.user...", req.user); //req.user comes from passport and is automatically filled in with the deserialized information from the session
  if (!req.isAuthenticated()) {
    //.isAuthenticated is a passport method which checks if they're logged in
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};
