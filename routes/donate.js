var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware=require("../middleware");

router.get("/donate",middleware.isLoggedIn, function (req, res) {
    res.render("donate");
});

module.exports = router;