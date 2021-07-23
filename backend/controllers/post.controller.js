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
  if (!req.body.id_user || !req.body.first_name || !req.body.last_name) {
    res.status(400).send({
      message: "Missing fields in request",
    });
    return;
  }

  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  } else image = "";

  const post = {
    id_user: req.body.id_user,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    content: req.body.content,
    image: image,
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

// Accès à tous les posts
exports.getAllPost = (req, res, next) => {
  let allComments = [];
  let allPosts = [];

  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);

      //   element.comments = allComments[element.id];
      //allPosts.push(posts);
    })
    .catch((error) => res.status(400).json({ error }));
};
