const express = require("express");
const { blogModel } = require("../models/blog.model");
const { authMiddleware } = require("../middleware/auth.middleware");

const blogRouter = express.Router();

blogRouter.use(authMiddleware);

blogRouter.post("/", async (req, res) => {
  try {
    const blog = new blogModel(req.body);
    const new_blog = await blog.save();
    res
      .status(200)
      .send({ msg: "A new blog is added successfully", new_blog: new_blog });
  } catch (err) {
    res.status(500).send({
      msg: "error ocurred while posting the blog",
      error: err.message,
    });
  }
});

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find({ username: req.body.username });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send({
      msg: "error ocurred while posting the blog",
      error: err.message,
    });
  }
});

blogRouter.patch("/:blogID", async (req, res) => {
  const { blogID } = req.params;
  const userID = req.body.userID;
  try {
    const blog = await blogModel.findOne({ _id: blogID });
    if (userID === blog.userID) {
      const updatedBlog = await blogModel.findByIdAndUpdate(
        { _id: blogID },
        req.body,
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "blog update success", updatedBlog: updatedBlog });
    } else {
      res
        .status(200)
        .send({ msg: "You are not authorized to update this blog" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while updating the blog", error: err.message });
  }
});

blogRouter.delete("/:blogID", async (req, res) => {
  const { blogID } = req.params;
  const userID = req.body.userID;
  try {
    const blog = await blogModel.findOne({ _id: blogID });
    if (userID === blog.userID) {
      const deletedBlog = await blogModel.findByIdAndDelete({ _id: blogID });
      res
        .status(200)
        .send({ msg: "blog delete success", deletedBlog: deletedBlog });
    } else {
      res
        .status(200)
        .send({ msg: "You are not authorized to delete this blog" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while deleting the blog", error: err.message });
  }
});

blogRouter.patch("/:blogID/like", async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await blogModel.findOne({ _id: blogID });
    const updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogID },
      { likes: Number(blog.likes) + 1 },
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "blog liked successfully", updatedBlog: updatedBlog });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while updating the blog likes", error: err.message });
  }
});

blogRouter.patch("/:blogID/comment", async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await blogModel.findOne({ _id: blogID });
    let arr = blog.comments;
    arr.push(req.body.comment);
    const updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogID },
      { comments: arr },
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "blog comment creation success", updatedBlog: updatedBlog });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while updating the blog likes", error: err.message });
  }
});

blogRouter.get(`*?title`, async (req, res) => {
  const { title } = req.query;
  try {
    const result = await blogModel.find({ title });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      msg: "error while searching blogs with tile",
      error: err.message,
    });
  }
});

blogRouter.get(`*?category`, async (req, res) => {
  const { category } = req.query;
  try {
    const result = await blogModel.find({ category });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      msg: "error while filtering blogs with category",
      error: err.message,
    });
  }
});

blogRouter.get(`*?sort`, async (req, res) => {
  const { order } = req.query;
  try {
    let result;
    if (order === "asc") {
      result = await blogModel.find({ sort: { date: 1 } });
    } else if (order === "desc") {
      result = await blogModel.find({ sort: { date: -1 } });
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      msg: "error while sorting blogs with date",
      error: err.message,
    });
  }
});

module.exports = { blogRouter };
