const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; //just to shorten future references

const CampgroundSchema = new Schema({
  title: String,
  images: [{ url: String, filename: String }], //we're taking the filename because the best way to delete a picture is by the filename
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", //from the review model
    },
  ],
});

//deletes reviews associated with campground when a campground is deleted
//the reasons why we pass in 'findOneAndDelete' is because that is what we used to delete campgrounds SO, they have to be THE SAME
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  console.log(doc);
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
