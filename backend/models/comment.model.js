module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
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
  });
  return Comment;
};
