// acts as test playground
const Tags = require('../dbexport.js');
const Discord = require('discord.js');
module.exports = {
	name: 'prefix',
	description: 'Change the servers prefix!',
	async execute(client, message, args) {
		try {
			// equivalent to: INSERT INTO tags (serverid,prefix,channel) values (x,x,x,);
			const tag = await Tags.create({
				serverid: message.guild.id,
				servername: message.guild.name,
				prefix: args[0],
				channel: message.channel.id,

			});
			return;
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {

				const affectedRows = await Tags.update({ prefix: args[0] }, { where: { serverid: message.guild.id } });
				if (affectedRows > 0) {
					return message.reply('Prefix was changed to' + args[0]);
				}
				return message.reply('Couldn\'t find a tag. This shouldn\'t happen :(');


			}
			return message.reply('Something went wrong with adding a tag.');
		}
	},
};
