
const addReaction = require('../../helpers/discord/addReaction');
const usercountChannel = require('../../helpers/discord/usercountChannel');
module.exports = {
    name: "add",
    category: "owner",
    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );


        if (args[0] === 'usercount') {
            //create a new membercount channel
            await usercountChannel(message);
        }


        //todo add more commands
        if (args[0] === 'reaction') {
            if (args[1] === 'studiengang') {
                await addStudiengangReaction(); 

            } else if (args[1] === 'semester') {
                await addSemesterReaction();

            } else if (args[1] === 'campus') {
                addCampusReaction();
            }

        }

    }
}
