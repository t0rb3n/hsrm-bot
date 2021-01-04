
const { MessageEmbed } = require('discord.js');
const findServer = require('../../helpers/db/findServer');
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


        if(args[0].toLowerCase() === 'usercount'){
            console.log("yeet");
            findServer(message.guild);
            //first get the matching channel of this server
            // if none exists, create one



        }else{ 
            return message.channel.send(`Couldn't find something matching to refresh.`)
        }

    }
}