//acts as test playground
const Tags = require('../dbexport.js');
const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(client, message, args) {
		message.channel.send('Pong.');
		/*
		const tag = await Tags.findOne({ where: { roleForAll: 'Admin' } });
		if (tag) {
			// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
			//tag.increment('usage_count');
			return message.channel.send(tag.get('serverid'));
		}
		*/

	},
};
