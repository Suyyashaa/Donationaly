var express = require("express");
var router = express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function (req, res) {
    res.render("index");
});


router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect:"/login"
}), function (req, res) {
});

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username , email: req.body.email, contactno:req.body.contactno, dob:req.body.dob});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success","User Registered Successfully.Welcome to YelpCamp "+user.username);
            res.redirect("/");

        });
    });
});

router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Logged you out");
    res.redirect("/");
});


router.get("/about", function (req, res) {
    res.render("about");
});


router.get("/gallery", function (req, res) {
    res.render("gallery");
});


router.get("/contact", function (req, res) {
    res.render("contact");
});


module.exports = router;