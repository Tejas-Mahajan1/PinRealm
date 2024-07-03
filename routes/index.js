var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create-user", async function (req, res) {
  const createdUser = await userModel.create({
    username: "Tejas",
    password: "Tejas@123",
    posts: [],
    email: "tejasm388@gmail.com",
    fullName: "Tejas Mahajan",
  });
  res.send(createdUser);
});

router.get("/create-post", async function (res, res) {
  try {
    const createPost = await postModel.create({
      postText: "Created by Tejas 2",
      user: "6684f02d9567e2839482c11e",
    });

    const user = await userModel.findOne({ _id: createPost.user });

    user.posts.push(createPost._id);
    await user.save(); // to save the user document
    res.send("Done");
  } catch (err) {
    console.log(err);
  }
});

router.get("/all-user-post", async function (req, res, next) {
  const user = await userModel.findOne({ _id: "6684f02d9567e2839482c11e" }).populate('posts'); // populate is used get the posts data through their id save in the posts array of user
  res.send(user)
});

module.exports = router;
