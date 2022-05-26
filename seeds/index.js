const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const res = require("express/lib/response");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//the for loop is going to do this 50 times giving us 50 new campgrounds
//random1000 because we have 1000 cities in cities.js
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6289597b88f53260dd5202ad",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore rerum voluptatum molestiae labore ipsam voluptatem a, non sequi similique ullam eos voluptates eum. Quasi illo earum ab dolore! Doloribus, suscipit!",
      price,
      images: [
        //copy pasted from console. Make sure you do not add in the id because its adds it FOR US and it will cause the app to break if you do
        {
          url: "https://res.cloudinary.com/dnyvhjgoo/image/upload/v1653580002/YelpCamp/hq2godxtpfdo0dv5u1ey.jpg",
          filename: "YelpCamp/hq2godxtpfdo0dv5u1ey",
        },
        {
          url: "https://res.cloudinary.com/dnyvhjgoo/image/upload/v1653580002/YelpCamp/ea9lanifwgowgs7zp5cc.jpg",
          filename: "YelpCamp/ea9lanifwgowgs7zp5cc",
        },
      ],
    });
    await camp.save();
  }
};

//closes mongoose afterwards
seedDB().then(() => {
  mongoose.connection.close();
});
