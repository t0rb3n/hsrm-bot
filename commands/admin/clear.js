"use strict";

module.exports = {
    name: "clear",
    category: "admin",
    description: "Clears given amount of messages.",
    usage: "$clear [1-100]",
    async execute(client, message, lang, args) {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            await message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
            return;
        }

        if (!args[0]) {
            await message.channel.send("Please enter a amount 1 to 100");
            return;
        }

        let deleteAmount;

        if (parseInt(args[0], 10) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0], 10);
        }
        await message.channel.bulkDelete(deleteAmount, true);

    }
};
