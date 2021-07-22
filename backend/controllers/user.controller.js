const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//Masquage de l'adresse email
const crypt = require("crypto-js");
const User = db.user;

dotenv.config();

exports.signup = (req, res) => {
  // Validate request
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "Un champs n'a pas été rempli!",
    });
    return;
  }

  // Create a secured user acount
  const cryptoEmail = crypt.MD5(req.body.email).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: cryptoEmail,
        password: hash,
      };
      // Save User in the database
      User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the new User.",
          });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  console.log(req.body.email);
  const cryptoEmail = crypt.MD5(req.body.email).toString();
  console.log(cryptoEmail);

  User.findOne({ email: cryptoEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.AUTH_SECRET_KEY_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprime le compte d'un utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé !",
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'utilisateur ${req.body.name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
