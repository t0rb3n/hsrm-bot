const Discord = require('discord.js');
module.exports = {
	name: 'react',
	description: 'react',
	execute(message, args) {
		message.channel.send('React here.').then(msg =>{
			msg.react('➕');
			msg.react('➖');
		});

	},
};