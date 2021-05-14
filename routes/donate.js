var express = require("express");
var router = express.Router();
var Donation = require("../models/donations");
var middleware = require("../middleware");

router.get("/donate", middleware.isLoggedIn, function (req, res) {
  res.render("donate");
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
      return res.redirect("/");
    }
  })
});
module.exports = router;