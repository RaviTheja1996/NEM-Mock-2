const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    username: String,
    userID: String,
    avatar: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: Array,
  },
  {
    versionKey: false,
  }
);

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };
