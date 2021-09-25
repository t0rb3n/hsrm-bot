"use strict";

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const { client } = interaction;

        if (interaction.user.bot || !interaction.guild) {
            return;
        }
        if (interaction.isButton()) {
            await require("./other/buttonInteraction")(interaction, client);
        }
    }
};
