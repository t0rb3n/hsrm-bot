// acts as test playground
module.exports = {
	name: 'findstudent',
	description: 'tries to mention a user who only has the student role but no semester role!',
	async execute(client, message, args) {

// TODO add case dozent and master
		message.channel.send('Students that only have the student role but no semester role:');

		const userArray = [];
		message.guild.members.cache.each(member => {
			// Doesnt work with the object from above

			if(member.roles.cache.find(r => r.name === 'Student HsRm (UdE)')) {
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
