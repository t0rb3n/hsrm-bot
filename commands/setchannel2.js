// Not working and not needed to work at the moment
const roleClaim = require('../roles/roleClaim.js');


const {Tags, Emojis} = require('../dbexport.js');
module.exports = {
	name: 'setchannel2',
	description: 'setchannel2!',
	async execute(client, message, args) {

		message.channel.bulkDelete(1);

		try {
			// equivalent to: INSERT INTO tags (serverid,prefix,channel) values (x,x,x,);
			const tag = await Tags.create({
				serverid: message.guild.id,
				servername: message.guild.name,
				prefix: '!',
				channel: message.channel.id,

			});
			return message.reply('Please define your emojis to react with now or execute the !start command!');
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				// update the tag accordingly

				// update the ChannelID for given Server if an entry already exists
				const affectedRows = await Tags.update({ channel: message.channel.id }, { where: { serverid: message.guild.id } });
				if (affectedRows > 0) {
					// return message.reply(`Tag was edited.`);
					//await roleClaim(client, message.channel.id);
					return;
				}
				return message.reply('Could not find a tag or something else happend.');


			}
			return message.reply('Something went wrong with adding a tag.');
		}


	},
};