const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    //sync true will recreate all table again again and wipe all data
    sync: { force: false },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tutorials = require("./product.model.js")(sequelize, Sequelize);
//db.comments = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;