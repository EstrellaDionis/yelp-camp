const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema; //just to shorten future references

//previously was images : [{url: String, filename:String}], in the CampgroundSchema
const ImageSchema = new Schema({
  url:String,
  filename:String
})

//on every image, we are calling it 'thumbnail'
ImageSchema.virtual('thumbnail').get(function(){
  //finding the first instance of /upload and replacing it with the next string
  //this is in the actual url in the image ON cloudinary
  //this. refers to the particular image
  return this.url.replace('/upload', '/upload/w_300')
})

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
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
