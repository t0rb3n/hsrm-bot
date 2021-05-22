const {servers} = require('../db/dbConnection')
const findOrCreateServer = require('../db/findOrCreateServer');
module.exports = async (message) => {

    //todo check if channel was deleted by now
    //low prio

    const server = await findOrCreateServer(message.guild.id);

    if (!server) {
        return null;
    }
    let channel = null;
    if (server.memberCountChannel) {
        channel = server.memberCountChannel;
    } else {

        const count = message.guild.memberCount;

        //create a new server
        const newChannel = await message.guild.channels.create("Studenten: " + count, {
            type: 'voice',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ['CONNECT']
            }]
        });

        await server.update({memberCountChannel: newChannel.id}, {where: {id: message.guild.id}});
        channel = newChannel;
    }
   // return channel;
}

