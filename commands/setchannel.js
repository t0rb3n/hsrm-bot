// Not working and not needed to work at the moment
const { Tags, Emojis } = require('../dbexport.js');
module.exports = {
	name: 'setchannel',
	description: 'setchannel!',
	async execute(client, message, args) {

		message.channel.bulkDelete(1);

		try {
			// equivalent to: INSERT INTO tags (serverid,prefix,channel) values (x,x,x,);
			const tags = await Tags.create({
				serverid: message.guild.id,
				servername: message.guild.name,
				prefix: '!',
				channel: message.channel.id,

			});
			return message.reply('Please define your emojis to react with now or execute the !start command!');
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {

				// update the ChannelID for given Server if an entry already exists
				await Tags.update({ channel: message.channel.id }, { where: { serverid: message.guild.id } });

				return message.reply('Could not find a tag or something else happend.');


			}
			return message.reply('Something went wrong with adding a tag.');
		}


	},
};