const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {sequelize, Server} = require("./db");
const logger = require("../lib/log.js");


const createServer = async(id, channel) => {
    const t = await sequelize.transaction();
    let server;
    try {
        server = await Server.create({
            id: id,
            channelId: channel,
            initDone: false,
        }, {transaction: t});

        await t.commit();
    } catch (error) {
        await t.rollback();
        logger.error(error.toString());
        return null;
    }
    return server;
}


module.exports = {createServer}