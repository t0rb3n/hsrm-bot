"use strict";
const {sequelize, Ticket} = require("../../lib/db");
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const logger = require("../../lib/log.js");

/**
 * Approves a given Ticket
 * @returns {void}
 * @param {Client} client the bot client
 * @param {Interaction} interaction The interaction to work on
 * @param {Ticket} ticket The ticket to this interaction
 */
async function approveTicket(client, interaction, ticket) {
    const pick = await ticket.getPick();
    const embed = new MessageEmbed()
        .setTitle("New Ticket Approval")
        .setColor("#262626")
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: "Pick ID:",
                value: `${pick.id}`,
                inline: true
            },
            {
                name: "Pick Name:",
                value: `${pick.name}`,
                inline: true
            },
            {
                name: "Pick Category:",
                value: `${pick.category}`,
                inline: true
            },
            {
                name: "New Art:",
                value: `${ticket.newUrl}`,
                inline: true
            }
        );

    await client.channels.cache.get("804612531943374899").send({embeds: [embed]});

    const t = await sequelize.transaction();

    try {
        ticket.approved = true;
        ticket.open = false;
        ticket.rejected = false;
        await ticket.save({transaction: t});

        await t.commit();
    } catch (error) {
        await t.rollback();
        logger.error(error.toString());
        const slicedError = error.toString().slice(0, 1850);

        // prushka test chamber
        await client.channels.cache.get("871313505364607006").send({content: `Error while updating ticket with errror: \`\`\` ${slicedError} \`\`\``});
    }

}

/**
 * Returns a action row with approved and by button
 * @returns {MessageActionRow} The newly built messagerow
 * @param {User} user The user who approved this ticket
 */
function approvedActionRow(user) {
    return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("approvedDone")
                .setLabel("Approved")
                .setStyle("SUCCESS")
                .setDisabled(true),
            new MessageButton()
                .setCustomId("declinedBy")
                .setLabel(`By: ${user.tag}`)
                .setStyle("SECONDARY")
                .setDisabled(true)
        );
}

/**
 * Build and returns a select menu to decline a ticket
 * @returns {MessageActionRow} The select menu action row
 */
function declinedReasonSelectMenu() {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("No reason selected")
                .addOptions([
                    {
                        label: "Original image is ok",
                        description: "The original image does not have any significant errors which would justify a change of this image.",
                        value: "original_image_ok"
                    },
                    {
                        label: "New picture doesn't meet requirements",
                        description: "The provided picture does not meet all of our requirements regarding collab pictures",
                        value: "new_image_requirements_not_ok"
                    },
                    {
                        label: "New picture is NSFW",
                        description: "The provided picture is considered NSFW and therefore not allowed.",
                        value: "new_image_nsfw"
                    },
                    {
                        label: "Other reason",
                        description: "Some other reason...",
                        value: "other_reason"
                    }
                ])
        );
}

module.exports = async (interaction, client) => {

    let roleButton;

    if (interaction.customId.startsWith("campus")) {
        roleButton = client.campusButton[interaction.customId];
    } else if (interaction.customId.startsWith("studiengang")) {
        roleButton = client.studiengangButton[interaction.customId];
    } else {
        return;
    }

    if (!roleButton) {
        logger.error("Used button with no role associated.")
        return;
    }

    const guild = client.guilds.cache.get(interaction.guild.id);
    const member = await guild.members.fetch(interaction.user.id);
    await member.roles.add(roleButton.roleId);

    await interaction.reply({content: `Du hast nun die Rolle **${roleButton.label}**!`, ephemeral: true})
};
