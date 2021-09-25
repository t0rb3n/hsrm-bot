"use strict";

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) {
            return;
        }

        if (!message.content.toLowerCase().startsWith(client.prefix)) {
            return;
        }
        const args = message.content.slice(client.prefix.length).trim().split(/ +/u);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) {
            return;
        }

        const command = client.commands.get(cmd);

        if (!command) {
            return;
        }

        await command.execute(client, message, args);
    }
};
