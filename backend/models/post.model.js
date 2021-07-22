module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
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
