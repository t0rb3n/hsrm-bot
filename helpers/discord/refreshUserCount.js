const servers = require('../db/dbConnection')
const findOrCreateServer = require('../db/findOrCreateServer');

//sendmessage as temp fix for memberAdd event, as it only emits a member object
module.exports = async (message, sendMessage) => {


    const server = await findOrCreateServer(message.guild.id);

    if (!server) {
        return null;
    }

    if (server.memberCountChannel) {

        const count = message.guild.memberCount;
        const channel = await message.guild.channels.cache.get(server.memberCountChannel);
        channel.edit({name: "Studenten: " + count});

        if(sendMessage) message.reply("Updated the user count.");
    } else {
        if (sendMessage) message.reply('You need to `!add` channel first, before being able to refresh');
    }
    return true;
}

