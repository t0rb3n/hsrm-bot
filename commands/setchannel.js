const db = require('../dbexport.js');
module.exports = {
	name: 'setchannel',
	description: 'setchannel!',
	async execute(message, args) {
		message.channel.send('Ping.');
		await db.set(message.guild.id, message.channel.id);

	},
};