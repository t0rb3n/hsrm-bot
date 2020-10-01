// Not working and not needed to work at the moment

const db = require('../dbexport.js');
const roleClaim = require('../roles/roleClaim.js');
module.exports = {
	name: 'setchannel',
	description: 'setchannel!',
	async execute(message, args) {
		await db.set(message.guild.id, message.channel.id).then(roleClaim());


	},
};