const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {sequelize, Button} = require("./db");
const logger = require("../lib/log.js");

const sendCampusMessage = async (client, channel, message) => {

    const messageButtons = await getCampusMessageButtons();
    if (messageButtons[0].components.length === 0) {
        await message.reply({content: "Bitte erstelle mindestens einen Campus mit !campus ... "})
        return null;
    }

    return await channel.send({embeds: [getCampusMessageEmbed()], components: messageButtons});
}

const getCampusMessageEmbed = () => {
    return new MessageEmbed()
        .setColor('#0e4aa8')
        .setTitle('Wähle deinen Campus aus!')
        .setDescription('Wähle den Campus auf dem du studierst, denn auch nicht UDE\'ler sind hier willkommen :) ')
        .setThumbnail('https://i.imgur.com/6UB9wpw.png')
        .setFooter('Drücke auf die entsprechenden Buttons unter dieser Nachricht um Teil der Gruppe zu werden.');
}

const getCampusMessageButtons = async () => {
    const buttons = await Button.findAll({
        where: {
            type: "campus"
        }
    });

    const rows = [];

    for (let i = 0; i <= buttons.length / 5; i++) {
        rows.push(new MessageActionRow());
    }

    for (const [index, button] of buttons.entries()) {
        rows[Math.floor(index / 5)]
            .addComponents(
                new MessageButton()
                    .setCustomId(button.customId)
                    .setStyle(button.style)
                    .setLabel(button.label)
                    .setEmoji(button.emojiId)
            )
    }
    return rows;
}


async function editCampusMessage(client, server) {
    const messageButtons = await getCampusMessageButtons();
    if (messageButtons[0].components.length === 0) {
        await client.channels.cache.get("876844911595511858").send({content: "Keine CampusMessageButtons gefunden. Erstelle erst welche."});
        return null;
    }

    const channel = await client.channels.fetch(server.channelId);
    const campusMessage = await channel.messages.fetch(server.campusMessage);
    await campusMessage.edit({embeds: [getCampusMessageEmbed()], components: messageButtons})
}

async function removeButtonByLabel(message, label) {
    const t = await sequelize.transaction();

    try {
        await Button.destroy({
            where: {
                customId: `campus-${label}`
            }
        }, {transaction: t});

        await t.commit();
    } catch (error) {
        await t.rollback();
        logger.error(error.toString());
        const slicedError = error.toString().slice(0, 1850);
        await message.reply({content: slicedError})
    }
}

module.exports = {
    getCampusMessageEmbed,
    getCampusMessageButtons,
    sendCampusMessage,
    editCampusMessage,
    removeButtonByLabel
}