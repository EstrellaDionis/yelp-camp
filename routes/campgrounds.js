const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas");
const campgrounds = require("../controllers/campgrounds");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"), //image is from new form and is the NAME for the INPUT for image
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// router.post("/", upload.array("image"), (req, res) => {
//   console.log(req.body, req.files);
//   res.send("It Worked");
// });

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
  isAuthor,
  upload.array("image"), //key of image in the edit form
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.delete("/:id", isLoggedIn, catchAsync(campgrounds.deleteCampground));

module.exports = router;
