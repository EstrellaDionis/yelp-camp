const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username }); //dont need password in here because passport handles that for us
    const registeredUser = await User.register(user, password); //.register is a passport method. takes the new user and the password and stores the hash'd password and salts
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message); //e is error being handled by passport
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds"; //returns us to wherever we were at. If we weren't anywhere, will send to /campgrounds
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(); //.logout() coming from passport
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
