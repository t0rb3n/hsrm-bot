"use strict";
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.username}, Requested Commands: `,
            message.author.displayAvatarURL()
        )
        .setColor("#fb644c")
        .setThumbnail(client.user.displayAvatarURL());
    const commands = (category) => {
        return client.commands
            .filter((cmd) => cmd.disabled === undefined)
            .filter((cmd) => cmd.category !== "admin")
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `- \`${cmd.name}\``)
            .join(" ");
    };

    const info = client.categories
        .filter((cat) => cat !== "admin")
        .map(
            (cat) =>
                stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** (${
                    client.commands.filter(
                        (cmd) =>
                            cmd.category == cat &&
                            cmd.disabled === undefined &&
                            cmd.category !== "admin"
                    ).size
                }) : \n${commands(cat)}`
        )
        .reduce((string, category) => string + "\n" + category);
    embed.setFooter(
        `There are ${
            client.commands.filter(
                (cmd) => cmd.disabled === undefined && cmd.category !== "admin"
            ).size
        } commands`,
        message.author.displayAvatarURL()
    );
    return message.channel.send({ embeds: [embed.setDescription(info)] });
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed();

    const cmd = client.commands.get(input.toLowerCase());
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(
            embed
                .setColor("#fb644c")
                .setAuthor(
                    `${message.author.username}, Requested Commands:`,
                    message.author.displayAvatarURL()
                )
                .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setDescription(info)
                .setThumbnail(client.user.displayAvatarURL())
        );
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases)
        info += `\n**Aliases**: ${cmd.aliases
            .map((a) => `\`${a}\``)
            .join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
    if (cmd.timeout) info += "\n**Timeout**: " + ms(cmd.timeout);

    return message.channel.send({
        embeds: [
            embed
                .setColor("#fb644c")
                .setAuthor(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                )
                .setDescription(info)
                .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setThumbnail(client.user.displayAvatarURL())
        ]
    });
}

module.exports = {
    name: "help",
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "!help [command]",
    async execute(client, message, args) {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        }
        return getAll(client, message);

    }
};
