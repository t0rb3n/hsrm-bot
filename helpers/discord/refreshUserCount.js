const servers = require('../db/dbConnection')
const findOrCreateServer = require('../db/findOrCreateServer');
module.exports = async (message) => {


    const server = await findOrCreateServer(message.guild.id);

    if (!server) {
        return null;
    }

    let channel = null;
    if (server.memberCountChannel) {

        const count = message.guild.memberCount;

        const channel = await message.guild.channels.cache.get(server.memberCountChannel)
        channel.edit({name: "Studenten: " + count});

        message.reply("Updated the user count.");

    } else {
        message.reply("You need to !add channel first, before being able to refresh");
    }
}

