//acts as test playground
const Tags = require('../dbexport.js');
const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(client, message, args) {
		message.channel.send('Pong.');
	},
};
