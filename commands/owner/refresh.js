
const { MessageEmbed } = require('discord.js')
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

        let deleteAmount;

        if(args[0].toLowerCase() === 'usercount')

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`successfully deleted ${deleteAmount}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#f2f2f2')
        await message.channel.send(embed)
    }
}