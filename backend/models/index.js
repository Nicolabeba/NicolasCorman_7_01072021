const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.post, { onDelete: "cascade" });
db.post.hasMany(db.comment, { onDelete: "cascade" });
db.post.belongsTo(db.user);
db.comment.belongsTo(db.post);
db.comment.belongsTo(db.user);

module.exports = db;
