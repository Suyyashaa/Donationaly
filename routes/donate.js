var express = require("express");
var router = express.Router();
var Ngo = require("../models/ngo");
var Donation = require("../models/donations");
var middleware = require("../middleware");

router.get("/donate", middleware.isLoggedIn, function (req, res) {
  Ngo.find({}, function (err, allNgo) {
    if (err) {
        console.log(err);
    }
    else {
        res.render("donate", { Ngo: allNgo });
    }
});

});

router.post("/donate", middleware.isLoggedIn, function (req, res) {
  const newDonation = {
    donor_name: req.body.name,
    donor_email: req.body.email,
    donor_phone: req.body.phone,
    donor_address: req.body.address,
    amount: req.body.amount,
    donor_pan: req.body.pan,
    donation_user: {
      id: req.user._id,
      username: req.user.username
    },
    donation_ngo:{
      id: req.body.ngo
    }
  };
  Donation.create(newDonation,(err,donation) => {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/donate");
    }
    else {
      console.log("Saved successfully");
      req.flash("success", "Donation Successfull " + req.user.username);
      return res.redirect("/submit");
    }
  })
});
module.exports = router;