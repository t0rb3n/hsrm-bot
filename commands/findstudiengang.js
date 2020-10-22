// acts as test playground
module.exports = {
	name: 'findstudiengang',
	description: 'tries to mention a user who has only studiengang role!',
	async execute(client, message, args) {


		const userArray = [];
		message.channel.send('Studenten die nur Studiengangs Rolle aber keine Semester Rolle haben:');


		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above

			if(member.roles.cache.find(r => r.name === 'MI')
				|| member.roles.cache.find(r => r.name === 'AI')
				|| member.roles.cache.find(r => r.name === 'ITS')
				|| member.roles.cache.find(r => r.name === 'WI')
				|| member.roles.cache.find(r => r.name === 'MM')) {


				if(!member.roles.cache.find(r => r.name === '1/2. Semester')
					&& !member.roles.cache.find(r => r.name === '3/4. Semester')
					&& !member.roles.cache.find(r => r.name === '5/6. Semester')
					&& !member.roles.cache.find(r => r.name === '7.+ Semester')) {


					userArray.push(member.id);
				}
			}

		});
		if(userArray.length == 0) {
			message.channel.send('Es gibt keine. Yay ヽ(^o^)ノ');
		}
		userArray.forEach(m => {
			message.channel.send('<@' + m + '>');
		});
	},
};
