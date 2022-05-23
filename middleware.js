const { campgroundSchema, reviewSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");

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

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body); //campgroundSchema is coming from schemas and .validate IS WHAT'S TELLING IT TO USE THE SCHEMA!
  if (error) {
    //literally only handling IF there's an error
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next(); //this is what sends to the next function!
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    //literally only handling IF there's an error
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next(); //this is what sends to the next function!
  }
};
