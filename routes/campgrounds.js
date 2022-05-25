const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas");
const campgrounds = require("../controllers/campgrounds");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

//.put is for updating
router.put(
  "/:id",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.delete("/:id", isLoggedIn, catchAsync(campgrounds.deleteCampground));

module.exports = router;
