
const usercountChannel = require('../../helpers/discord/usercountChannel');
module.exports = {
    name: "add",
    category: "owner",
    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) // sets the permission
            return message.channel.send(
                `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            );


        if(args[0] === 'usercount'){
            //create a new membercount channel
            const membercountChannel = await usercountChannel(message);
        }


        //todo add more commands
        if(args[0] === ''){

        }

    }
}
