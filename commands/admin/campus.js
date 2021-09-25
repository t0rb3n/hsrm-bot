const {MessageEmbed} = require('discord.js')
const {sequelize, Button, Server} = require("../../lib/db");
const logger = require("../../lib/log");
const campus = require("../../lib/campus");
const server = require("../../lib/server");


module.exports = {
    name: "campus",
    category: "admin",
    description: "Clears given amount of messages.",
    usage: "!campus add|remove label [emoji] [role]",
    async execute(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(
                `Du hast nicht die nötigen Rechte dafür, ${message.author.username}!` // returns this message to user with no perms
            );
        }

        let foundServer = await findServerById(client, message.guild.id)
        if (!foundServer) {
            foundServer = await server.createServer(message.guild.id);
        }

        if (args[0] === "add") {
            if (args.length < 4) {
                await message.channel.send("Folgendes Format wird akzeptiert: !campus add [label] [emoji] [role]")
                return;
            }

            await addCampus(message, args[1], args[2], args[3].match(/([0-9]+)/)[0]);

            if (foundServer.initDone) {
                await campus.editCampusMessage(client, foundServer);
            }

            await message.reply({content: "Done!"})
        } else if (args[0] === "remove") {
            if (args.length < 2) {
                await message.channel.send("Folgendes Format wird akzeptiert: !campus remove [label]")
                return;
            }

            await campus.removeButtonByLabel(message, args[1]);

            if (foundServer.initDone) {
                await campus.editCampusMessage(client, foundServer);
            }
            await message.reply({content: "Done!"})

        } else {
            await message.channel.send({content: "Usage: !campus add|remove label [emoji] [role]"})
        }
        //reload internal cache
        await client.loadRoleButtons();
    }
}


async function addCampus(message, label, emoji, role) {

    const foundCampus = await Button.findOne({where: {customId: `campus-${label}`}});
    if (foundCampus) {
        await message.reply({content: "Es gibt bereits ein Button mit diesem Label."})
        return;
    }

    const t = await sequelize.transaction();

    try {
        await Button.create({
            customId: `campus-${label}`,
            type: "campus",
            emojiId: emoji,
            label: label,
            style: "SECONDARY",
            roleId: role,
        }, {transaction: t});

        await t.commit();
    } catch (error) {
        await t.rollback();
        logger.error(error.toString());
        const slicedError = error.toString().slice(0, 1850);
        await message.reply({content: slicedError})
    }
}

async function findServerById(client, serverId) {
    return await Server.findOne({
        where: {
            id: serverId
        }
    });
}
