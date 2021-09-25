const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {StudiengangButton, Button, sequelize} = require("./db");
const logger = require("../lib/log.js");

const sendStudiengangMessage = async (client, channel, message) => {

    const messageButtons = await getStudiengangButtons();
    if (messageButtons[0].components.length === 0) {
        await message.reply({content: "Bitte erstelle mindestens einen Studiengang mit !studiengang ... "})
        return null;
    }

    return await channel.send({embeds: [getStudiengangMessageEmbed()], components: messageButtons});
}

const getStudiengangMessageEmbed = () => {
    return new MessageEmbed()
        .setColor('#0e4aa8')
        .setTitle('Wähle deinen Studiengang aus!')
        .setDescription('Wähle den Studiengang aus, den du studierst. Sollte dein Studiengang fehlen, lass es uns wissen!')
        .setThumbnail('https://i.imgur.com/6UB9wpw.png')
        .setFooter('Drücke auf die entsprechenden Buttons unter dieser Nachricht um Teil der Gruppe zu werden.');
}

const getStudiengangButtons = async () => {
    const buttons = await Button.findAll({
        where: {
            type: "studiengang"
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


async function editStudiengangMessage(client, server) {
    const messageButtons = await getStudiengangButtons();
    if (messageButtons[0].components.length === 0) {
        await client.channels.cache.get("876844911595511858").send({content: "Keine StudiengangMessageButtons gefunden. Erstelle erst welche."});
        return null;
    }

    const channel = await client.channels.fetch(server.channelId);
    const studiengangMessage = await channel.messages.fetch(server.studiengangMessage);
    await studiengangMessage.edit({embeds: [getStudiengangMessageEmbed()], components: messageButtons})
}

async function removeButtonByLabel(message, label) {
    const t = await sequelize.transaction();

    try {
        await Button.destroy({
            where: {
                customId: `studiengang-${label}`
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
    sendStudiengangMessage,
    getStudiengangMessageEmbed,
    getStudiengangButtons,
    editStudiengangMessage,
    removeButtonByLabel
}