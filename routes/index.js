var express = require("express");
var router = express.Router();

const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});


router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/feed");
    });
  });
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
  }),
  function (res, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.get("/profile", isLoggedIn ,function (req, res, next) {
res.render("profilePage")
});

router.get("/feed", isLoggedIn ,function (req, res, next) {
res.render("feed")
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
