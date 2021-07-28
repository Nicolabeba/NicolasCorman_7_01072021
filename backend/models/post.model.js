module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    id_user: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  return Post;
};
