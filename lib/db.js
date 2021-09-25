/* eslint-disable camelcase */
"use strict";
const logger = require("./log");
const Sequelize = require("sequelize");

/**
 * Checks the connection to the database
 * @param {sequelize} seq Sequelize object
 * @returns {void}
 */
async function checkConnection(seq) {
    try {
        await seq.authenticate();
        logger.info("Connection has been established successfully.");
    } catch (error) {
        logger.error("Unable to connect to the database:", error);
    }
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
    logging: msg => logger.info(msg)
});

checkConnection(sequelize);

const Button = sequelize.define("button", {
    customId: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    type: Sequelize.STRING,
    emojiId: Sequelize.STRING,
    label: Sequelize.STRING,
    style: Sequelize.STRING,
    roleId: Sequelize.STRING
});
const Server = sequelize.define("server", {
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    channelId: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    campusMessage: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    studiengangMessage: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    initDone:  {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});


// Servers.sync({force:true}) //{force:true}
sequelize.sync()
    .then(() => {
        logger.info("Database & tables created!");
    });

module.exports = { sequelize, Button, Server };
