const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinRealm");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Assuming you have a Post model
      },
    ],
    dp: {
      type: String,
      // default: 'default_dp.png', // Set a default profile picture if needed
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
