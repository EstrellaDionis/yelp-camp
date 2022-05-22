const req = require("express/lib/request");

//middleware is triggered when clicking on creating or editing a campground or whatevers else you add it to
module.exports.isLoggedIn = (req, res, next) => {
  console.log("req.user...", req.user); //req.user comes from passport and is automatically filled in with the deserialized information from the session
  if (!req.isAuthenticated()) {
    // console.log(req.path, req.originalUrl); //you will see the paths when you click on new. We want to go to the original
    req.session.returnTo = req.originalUrl;
    //.isAuthenticated is a passport method which checks if they're logged in
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};
