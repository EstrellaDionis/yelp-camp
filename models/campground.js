const mongoose = require("mongoose");
const Schema = mongoose.Schema; //just to shorten future references

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", //from the review model
    },
  ],
});

module.exports = mongoose.model("Campground", CampgroundSchema);
