var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Ngo = require("../models/ngo");

var nodemailer = require('nodemailer');

router.get("/", function (req, res) {
    res.render("index");
});


router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {
    req.flash("success", "User Registered Successfully.Welcome to Donationaly " + user.username);
});

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username, email: req.body.email, contactno: req.body.contactno, dob: req.body.dob });
    if (req.body.password == req.body.pass2) {
        User.register(newUser, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                req.flash("error", err.message);
                return res.redirect("/register");
            }
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "User Registered Successfully.Welcome to Donationaly " + user.username);
                res.redirect("/");

            });
        });
    }
    else{
        req.flash("error", "Password Mismatch.");
        return res.redirect("/register");
    }
});

router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Logged you out");
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

router.post("/contact", function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dhruvpatel11611@gmail.com',
            pass: 'tuycctodtgxwtfdq'
        }
    });

    var mailOptions = {
        from: 'dhruvpatel11611@gmail.com',
        to: req.body.email,
        subject: 'Donationaly: Looks like you have a query',
        text: 'Hello ' + req.body.name + ', \nThis is Dhruv Patel from the customer satisfaction team of Donationaly. This is to inform you that we have recieved your query and we will be responding back as soon as possible.\nThankyou,\nTeam Donationaly'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect("/");
        }
    });
});



router.get("/registerNgo", function (req, res) {
    res.render("registerNgo");
});

router.post("/registerNgo", function(req, res){
  const newNgo = new Ngo({
    name: req.body.name,
    email: req.body.username,
    regNo: req.body.regNo,
    contact: req.body.contact,
    description: req.body.description

  });
  newNgo.save((err) => {
    if (err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/registerNgo");
    }
    else{
      console.log("Saved successfully");
      req.flash("success", "Registered as an NGO successfully" + user.username);
      res.redirect("/");
    }
  })
})

module.exports = router;
