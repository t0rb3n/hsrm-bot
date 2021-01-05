const {MessageEmbed} = require('discord.js');
const findServer = require('../../helpers/db/findOrCreateServer');
const usercount = require('../../helpers/discord/refreshUserCount');
module.exports = {
    name: "refresh",
    category: "owner",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );
        if (!args[0]) {
            return message.channel.send(`Please enter something you would want to update. (usercount )`)
        }

        //todo add more commands
        if (args[0].toLowerCase() === 'usercount') {
            // TODO fix weird behavior with command sometimes not working
            const msg = await usercount(message,true);

        } else {
            return message.channel.send(`Couldn't find something matching to refresh.`)
        }

    }
}
