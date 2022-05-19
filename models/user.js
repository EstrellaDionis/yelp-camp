const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//this is going to add on username and password and make sure usernames are unique etc
//all of this is coming from the passport package
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
