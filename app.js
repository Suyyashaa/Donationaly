var express = require("express"),
app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/login", function(req, res) {
  res.render("login");
});
app.get("/register", function(req, res) {
  res.render("register");
});
app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/gallery", function(req, res) {
  res.render("gallery");
});
app.get("/contact", function(req, res) {
  res.render("contact");
});


app.listen(3000, function() {
  console.log("Server is running");
});
