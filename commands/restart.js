// acts as test playground
const Discord = require('discord.js');
module.exports = {
	name: 'restart',
	description: 'Restarts the bot!',
	async execute(client, message, args) {

		if (!message.member.roles.cache.some((role) => role.name === 'admin')) {
			return message.channel.send('You cannot use this command!');
		}
		await message.channel.send('Restarting bot...');
		process.exit();
	},
};
