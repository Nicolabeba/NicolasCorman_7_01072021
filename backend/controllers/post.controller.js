const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Post = db.post;

dotenv.config();

exports.createPost = (req, res, next) => {
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let post = {
    content: req.body.content,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };

  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while posting.",
      });
    });
};
