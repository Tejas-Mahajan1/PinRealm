var express = require("express");
var router = express.Router();

const userModel = require("../models/userModel");
const postModel = require("../models/postModel");


router.get("/", function (req, res, next) {
  res.render("index", { msg: "Welcome !! TO Realm of Pins" , title: "Home" })
});



module.exports = router;
