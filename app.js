var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStratergy = require("passport-local"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  mongoose = require("mongoose");

var authRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/donationaly", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Dhruv",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});


app.use(authRoutes);

app.listen(3000, function () {
  console.log("Server is running");
});
