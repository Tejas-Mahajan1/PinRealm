var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
  res.render("index", { msg: "Welcome !! TO THE BACKEND PREP" , title: "Home" })
});



module.exports = router;
