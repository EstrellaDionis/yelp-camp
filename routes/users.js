const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const req = require("express/lib/request");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username }); //dont need password in here because passport handles that for us
      const registeredUser = await User.register(user, password); //.register is a passport method. takes the new user and the password and stores the hash'd password and salts
      console.log(registeredUser);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message); //e is error being handled by passport
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

//passport.authenticate is using the 'local' strategy
// flash a failure message is something goes wrong
//redirect to 'login' if theres a failure
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!");
    res.redirect("/campgrounds");
  }
);

router.get("/logout", (req, res) => {
  req.logout(); //.logout() coming from passport
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
});
module.exports = router;
