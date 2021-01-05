const servers = require('../../helpers/db/dbConnection')
const { MessageEmbed } = require('discord.js')
const findOrCreateServer = require('../../helpers/db/findOrCreateServer');
const reactionAdd = require('../../events/message/reactionAdd');

module.exports = {
    name: "reaction",
    category: "moderation",
    description: "Sends the messages users can react to",
    usage: "!reactions [campus|studiengang|semester|all]",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );

            //get the infos object from database
            const server = await findOrCreateServer(message.guild.id);

            if(!server){
                message.reply("Some error while trying to access the database.");
            }
            let channel;
            if(!server.channelId){
                //create a channel if none exists
                channel = await message.guild.channels.create("Rollenverteilung ", {
                    type: 'text',
                    permissionOverwrites: [{
                        id: message.guild.id,
                        deny: ['SEND_MESSAGES']
                    }]
                });

                await servers.update({channelId: channel.id}, {where: {id: message.guild.id}});

            } else{
                channel = server.channelId;
            }

        /*
        const embed = new Discord.MessageEmbed()
            .setColor('#0e4aa8')
            .setTitle('Wähle deinen Campus aus!')
            .setDescription('Wähle den Campus auf dem du studierst. Einer reicht! :) ')
            .setThumbnail('https://i.imgur.com/6UB9wpw.png')
            .setFooter('Drückt auf die entsprechenden Emojis hier unter dieser Nachricht um Teil der Gruppe zu werden.');

*/





        //send the campus messgae

            //send the studiengangs message

            //send the semester message


        client.on( 'messageReactionAdd', async (reaction, user) => {
            require('../../events/message/reactionAdd')(reaction,user,channel);
        });

    }
}
