"use strict";
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {sequelize, Server} = require("../../lib/db");
const campus = require("../../lib/campus");
const studiengang = require("../../lib/studiengang");
const server = require("../../lib/server");
const logger = require("../../lib/log");

module.exports = {
    name: "init",
    category: "admin",
    description: "Sends initial message",
    usage: "!init",
    async execute(client, message, args) {

        if (message.guild === "369455206100107275"
            || message.guild === "760439431592935434") { //UDE Guild
            return;
        }
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                `Du hast nicht die nötigen Rechte dafür, ${message.author.username}!` // returns this message to user with no perms
            );
        }

        const channel = getChannelFromMention(client, args[0]);
        if (!channel) {
            await message.reply({content: "Konnte den Channel nicht finden."});
            return;
        }

        let foundServer = await Server.findOne({where: {id: message.guild.id}})
        if (!foundServer) {
            foundServer = await server.createServer(message.guild.id, channel.id);
        }

        if(foundServer.campusMessage || foundServer.studiengangMessage ){
            await campus.editCampusMessage(client, foundServer);
            await studiengang.editStudiengangMessage(client, foundServer);
            return;
        }
        //send message to channel
        const campusMessage = await campus.sendCampusMessage(client, channel, message);
        if (!campusMessage) {
            return;
        }

        const studiengangMessage = await studiengang.sendStudiengangMessage(client, channel, message);
        if (!studiengangMessage) {
            return;
        }

        const t = await sequelize.transaction();

        try {
            await Server.update({
                    channelId: channel.id,
                    campusMessage: campusMessage.id,
                    studiengangMessage: studiengangMessage.id,
                    initDone: true
                },
                {
                    where: {
                        id: message.guild.id
                    }
                }, { transaction: t });
            await t.commit();

        } catch (error) {
            await t.rollback();
            logger.error(error.toString());
            const slicedError = error.toString().slice(0, 1850);
            await message.reply({content: slicedError})
        }
    }
};

function getChannelFromMention(client, mention) {
    if (!mention) {
        return null;
    }

    if (mention.startsWith("<#") && mention.endsWith(">")) {
        const channelId = mention.slice(2, -1);
        return client.channels.cache.get(channelId);
    }
    return null;
}


/*     row.addComponents(new MessageButton()
        .setCustomId("sheesh")
        .setLabel("Third")
        .setStyle("SECONDARY")
        .setEmoji("830382008890687500"))*/