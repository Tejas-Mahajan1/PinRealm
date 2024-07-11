var express = require("express");
var router = express.Router();

const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer");

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
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

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
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

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  }).populate('posts')
  res.render("profilePage", { user });
});

router.get("/feed", isLoggedIn, function (req, res, next) {
  res.render("feed");
});

router.post( "/upload",
  isLoggedIn,
  upload.single("file"),
  async function (req, res, next) {
    if (!req?.file) {
      return res.status(404).send("No file is uploaded.");
    }
    console.log("File Uploaded Successfully !!");
    const user = await userModel.findOne({
      username: req.session.passport.user
    });

    const post = await postModel.create({
      image: req.file.filename,
      postText: req.body.caption,
      user: user._id,
    });

   user.posts.push(post._id)
   await user.save();

    res.send("Done");
  }
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
