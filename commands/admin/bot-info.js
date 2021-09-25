"use strict";
const { MessageEmbed } = require("discord.js");
const os = require("os");

module.exports = {
    name: "bot-info",
    category: "admin",
    description: "Shows info about the bot",
    usage: "$bot-info",
    async execute(client, message) {

        if (!message.guild) {
            return;
        }
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                `Du hast nicht die nötigen Rechte dafür, ${message.author.username}!` // returns this message to user with no perms
            );
        }
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("Bot Stats")
            .setColor("#000000")
            .addFields(
                {
                    name: "🌐 Servers",
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: "📺 Channels",
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: "👥 Server Users",
                    value: `Serving ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: "⏳ Ping",
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: "Join Date",
                    value: `${client.user.createdAt}`,
                    inline: true
                },
                {
                    name: "Server Info",
                    value: `Cores: ${os.cpus().length}`,
                    inline: true
                }
            )
            .setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL());

        await message.channel.send({ embeds: [embed] });
    }
};
