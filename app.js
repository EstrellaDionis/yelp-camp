const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const router = express.Router();
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

//mongo connection to db
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); //does not need to be '_method' and can be whatever we want
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig)); //for creating sessions for users
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //always make sure we use session (line 47) before passport.session
passport.use(new LocalStrategy(User.authenticate())); //this is saying, passport, please use our LocalStrategy and for that LS the authentication method is located on the user model BUT WE didnt make authentication, its coming from PASSPORT

passport.serializeUser(User.serializeUser()); //this is storing the session (login)
passport.deserializeUser(User.deserializeUser()); //this is unstoring the session (logout)

//global variables/accessible in all templates
app.use((req, res, next) => {
  //res.locals.success - in our locals under the key 'success'
  //  req.flash('success') - whatever is under req.flash('variableName'), it will display the message that its attached to wherever it is
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

//will only run if nothing else is matched first
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//error becomes the ExpressError function from the catch-all right above
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err; //this ONLY TRIGGERS if we did not provide a message or statusCode to any endpoint the ExpressError function is on!
  if (!err.message) err.message = "Oh No, Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(9000, () => {
  console.log("Running on port 9000");
});
