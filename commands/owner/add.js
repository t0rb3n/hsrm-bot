
const addReaction = require('../../helpers/discord/addReaction');
const usercountChannel = require('../../helpers/discord/usercountChannel');
const {servers, studiengang,semester, ude} = require("../../helpers/db/dbConnection");


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



        if (args[0] === 'reaction') {

            if (args[1] === 'studiengang') {
                let ude = await servers.findOne();
                await addStudiengangReaction(message, args, ude);

            } else if (args[1] === 'semester') {
                await addSemesterReaction(message, args);

            } else if (args[1] === 'campus') {
                addCampusReaction();
            }

        }

    }
}

async function addSemesterReaction(message, args){
    console.log(args);
    const shortName = args[2];
    const role = args[3].match(/([0-9]+)/)[0];
    const emojiString = args[4];
    let embedText = '';
    for(let i = 0; i < args.length - 5; i++) {
        embedText += args[5 + i] + ' ';
    }

    try {
        await semester.create({
            shortName: shortName,
            emojiString: emojiString,
            fullName: embedText,
            role: role,
            serverId: message.guild.id
        });
    } catch (e){
        if (e.name === 'SequelizeUniqueConstraintError') {
            // update the tag accordingly
            return message.reply('SequelizeUniqueConstraintError');
        }
        return message.reply('Something went wrong with adding a tag.');
    }

    console.log("Shortname: " + shortName);
    console.log("Role: " + role);
    console.log("Emojistring: " + emojiString);
    console.log("embedText: " + embedText);

}


async function addStudiengangReaction(message, args, ude){

    const shortName = args[2].match(/[a-zA-Z]+/)[0];
    const role = args[3].match(/([0-9]+)/)[0];
    const emojiString = args[4];
    let embedText = '';
    for(let i = 0; i < args.length - 5; i++) {
        embedText += args[5 + i] + ' ';
    }


    //todo check if server exists

    try {
        await studiengang.create({
            shortName: shortName,
            emojiString: emojiString,
            fullName: embedText,
            role: role,
            serverId: message.guild.id
        });
    } catch (e){
        if (e.name === 'SequelizeUniqueConstraintError') {
            // update the tag accordingly
            return message.reply('SequelizeUniqueConstraintError');
        }
        return message.reply('Something went wrong with adding a tag.');
    }

    console.log("Shortname: " + shortName);
    console.log("Role: " + role);
    console.log("Emojistring: " + emojiString);
    console.log("embedText: " + embedText);
    //ude.studiengangEmoji = { [shortName]: { "role": role, "emojiString": emojiString, "embedText": embedText} }
    //await ude.save();
}
