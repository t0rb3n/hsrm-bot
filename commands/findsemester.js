// acts as test playground
module.exports = {
	name: 'findsemester',
	description: 'tries to mention a user who has more than one semester role!',
	async execute(client, message, args) {


		// TODO add case dozent and master
		message.channel.send('Studenten die mehr als eine Semester Rolle haben:');

		const userArray = [];

		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above
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
			if(sum > 1) {
				userArray.push(member.id);
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
