// acts as test playground
module.exports = {
	name: 'try',
	description: 'tries to mention a user!',
	async execute(client, message, args) {
		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above
			// todo case that someone has multiple sem roles

			let sum = 0;
			if(member.roles.cache.find(r => r.name === '1/2. Semester')) {
				sum++;

			}
			if(member.roles.cache.find(r => r.name === '3/4. Semester')) {
				sum++;

			}
			if(member.roles.cache.find(r => r.name === '5/6. Semester')) {
				sum++;

			}
			if(member.roles.cache.find(r => r.name === '7.+ Semester')) {
				sum++;

			}

			const userArray = [];
			if(sum > 1) {
				userArray.push(member.id);
			}

			userArray.forEach(m => { 
				message.channel.send('<@' + m + '>');
			});

		});

	},
};
