module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    id_user: {
      type: Sequelize.INTEGER,
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
