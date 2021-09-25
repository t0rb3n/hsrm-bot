"use strict";
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "Returns Latency and API Ping",
    usage: "!ping",
    async execute(client, message, lang) {

        if (!message.guild) {
            return;
        }

        const msg = await message.channel.send("Pinging...");
        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(
                `⌛ Latency is ${Math.floor(
                    msg.createdTimestamp - message.createdTimestamp
                )}ms\n⏲️ API Ping is ${Math.round(client.ws.ping)}`
            )
            .setColor("#fb644c");

        msg.edit("\u200b");
        msg.edit({ embeds: [embed] });
    }
};
