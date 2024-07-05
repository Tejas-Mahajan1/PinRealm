const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");


const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
    ,
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.plugin(plm);

module.exports = mongoose.model("Post", postSchema);
