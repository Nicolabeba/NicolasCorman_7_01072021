module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
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
  });
  return Comment;
};
