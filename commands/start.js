// acts as test playground
const { Tags, Emojis } = require('../dbexport.js');
const Discord = require('discord.js');
const roleClaim = require('../roles/roleClaim.js');
module.exports = {
	name: 'start',
	description: 'Starts the reaction message!',
	async execute(client, message, args) {

		message.channel.bulkDelete(1);

		const emojilist = await Emojis.findAll({
			attributes: ['emojiString', 'roleToGive'],
			where: {
				serverid: message.guild.id,
			},
		});

		const emojiArray = {};
		emojilist.forEach(e => {
			const id = e.emojiString.match(/([0-9]+)/)[0];
			emojiArray[id] = e.roleToGive;
		});



		const channelList = await Tags.findAll({
			attributes: ['channel'],
			where: {
				serverid: message.guild.id,
			},
		});


		await roleClaim(client, channelList[0].channel, emojiArray);
	},
};
